"use client";

import { useEffect, useRef, type RefObject } from "react";
import type { DocTemplate } from "@/data/templates";

type SpringKeys = "x" | "y" | "z" | "rx" | "ry" | "rz" | "s" | "o";

type Body = {
  id: string;
  seed: number;
  tilt: number;
  el: HTMLElement;
  shadow: HTMLElement;
  p: Record<SpringKeys, number>;
  v: Record<SpringKeys, number>;
  target: Record<SpringKeys, number>;
  released: boolean;
  releaseAt: number;
};

const K: Record<SpringKeys, number> = {
  x: 120,
  y: 120,
  z: 140,
  rx: 160,
  ry: 160,
  rz: 120,
  s: 170,
  o: 90,
};

const DAMP: Record<SpringKeys, number> = {
  x: 17,
  y: 17,
  z: 20,
  rx: 18,
  ry: 18,
  rz: 15,
  s: 21,
  o: 19,
};

const KEYS: SpringKeys[] = ["x", "y", "z", "rx", "ry", "rz", "s", "o"];
const TILTS = [-14, 11, -8, 13, -11, 9, -16, 10, -6, 15, -12, 7];

function springStep(
  p: number,
  v: number,
  target: number,
  k: number,
  damp: number,
  dt: number,
) {
  const f = -k * (p - target) - damp * v;
  v += f * dt;
  p += v * dt;
  return [p, v] as const;
}

function buildRing(W: number, H: number, mobile: boolean) {
  const rx = (mobile ? 0.48 : 0.4) * W;
  const ry = (mobile ? 0.38 : 0.4) * H;
  const cx = W / 2;
  const cy = H * 0.54;
  const n = 720;
  const raw: Array<{ x: number; y: number }> = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const px = Math.sign(c) * Math.pow(Math.abs(c), 0.5);
    const py = Math.sign(s) * Math.pow(Math.abs(s), 0.5);
    raw.push({ x: cx + px * rx, y: cy + py * ry });
  }
  const pts = [{ ...raw[0], dist: 0 }];
  let len = 0;
  for (let i = 1; i < raw.length; i++) {
    len += Math.hypot(raw[i].x - raw[i - 1].x, raw[i].y - raw[i - 1].y);
    pts.push({ ...raw[i], dist: len });
  }
  return { pts, len, cx, cy };
}

function sampleRing(
  ring: ReturnType<typeof buildRing>,
  u: number,
) {
  let d = (((u % 1) + 1) % 1) * ring.len;
  let lo = 0;
  let hi = ring.pts.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (ring.pts[mid].dist < d) lo = mid;
    else hi = mid;
  }
  const a = ring.pts[lo];
  const b = ring.pts[hi];
  const span = b.dist - a.dist || 1;
  const t = (d - a.dist) / span;
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  };
}

export function useTemplateOrbit(
  stageRef: RefObject<HTMLDivElement | null>,
  templates: DocTemplate[],
  enabled: boolean,
) {
  const bodiesRef = useRef<Body[]>([]);
  const hoverRef = useRef(-1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !enabled) return;

    let W = stage.clientWidth;
    let H = stage.clientHeight;
    let mobile = W < 760;
    let CW = mobile ? Math.min(W * 0.28, 128) : Math.min(Math.max(W * 0.11, 118), 188);
    let CH = CW * 1.32;
    let mx = 0.5;
    let my = 0.5;
    let phase = 0;
    let phaseV = 0;
    let ring = buildRing(W, H, mobile);
    let drag: {
      i: number;
      sx: number;
      sy: number;
      px: number;
      py: number;
      vx: number;
      vy: number;
      moved: boolean;
    } | null = null;
    let spinning = false;
    let spinLast: { x: number; y: number } | null = null;
    const t0 = performance.now() / 1000;
    let last = performance.now();
    let raf = 0;

    stage.innerHTML = "";
    const bodies: Body[] = templates.map((tpl, i) => {
      const wrap = document.createElement("div");
      wrap.className = "orbit-item";
      wrap.dataset.i = String(i);
      wrap.innerHTML = `
        <div class="template-card template-card--orbit" style="--card-accent:${tpl.accent};--card-spine:${tpl.spine}">
          <div class="template-card__3d">
            <div class="template-card__face template-card__front">
              <div class="template-card__bar"></div>
              <div class="template-card__body">
                <p class="template-card__cat">${tpl.category}</p>
                <h3 class="template-card__title">${tpl.title}</h3>
                <p class="template-card__sub">${tpl.subtitle}</p>
                <div class="template-card__lines" aria-hidden>
                  ${tpl.previewLines
                    .map(
                      (line) =>
                        `<span class="${line ? "is-text" : "is-gap"}">${line || "&nbsp;"}</span>`,
                    )
                    .join("")}
                </div>
              </div>
              <div class="template-card__sheen" aria-hidden></div>
            </div>
            <div class="template-card__face template-card__spine"></div>
            <div class="template-card__face template-card__edge"></div>
          </div>
        </div>`;
      const shadow = document.createElement("div");
      shadow.className = "orbit-shadow";
      stage.appendChild(shadow);
      stage.appendChild(wrap);
      const seed = Math.sin(i * 91.7) * 0.5 + 0.5;
      return {
        id: tpl.id,
        seed,
        tilt: TILTS[i % TILTS.length],
        el: wrap,
        shadow,
        released: false,
        releaseAt: 0.2 + i * 0.06,
        p: {
          x: W / 2,
          y: H / 2,
          z: 0,
          rx: 0,
          ry: 0,
          rz: TILTS[i % TILTS.length],
          s: 0.2,
          o: 0,
        },
        v: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, s: 0, o: 0 },
        target: {
          x: W / 2,
          y: H / 2,
          z: 0,
          rx: 0,
          ry: 0,
          rz: TILTS[i % TILTS.length],
          s: 1,
          o: 1,
        },
      };
    });
    bodiesRef.current = bodies;

    const onResize = () => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      mobile = W < 760;
      CW = mobile ? Math.min(W * 0.28, 128) : Math.min(Math.max(W * 0.11, 118), 188);
      CH = CW * 1.32;
      stage.style.setProperty("--orbit-w", `${CW}px`);
      ring = buildRing(W, H, mobile);
    };
    onResize();

    const onPointerMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      mx = (e.clientX - rect.left) / W;
      my = (e.clientY - rect.top) / H;
      if (drag) {
        const dx = e.clientX - drag.px;
        const dy = e.clientY - drag.py;
        drag.vx = dx;
        drag.vy = dy;
        drag.px = e.clientX;
        drag.py = e.clientY;
        const b = bodies[drag.i];
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        b.p.x = x;
        b.p.y = y;
        b.target.x = x;
        b.target.y = y;
        b.target.z = 90;
        b.target.s = 1.08;
        b.target.rz = b.tilt + drag.vx * 2.2;
        b.target.ry = drag.vx * 2.4;
        b.target.rx = -drag.vy * 2.4;
        drag.moved =
          drag.moved || Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 6;
      } else if (spinning && spinLast) {
        phaseV += (e.clientX - spinLast.x) * 0.0001;
        spinLast = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("[data-orbit-ui]")) return;
      const rect = stage.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const sorted = [...bodies].sort((a, b) => b.p.z - a.p.z);
      let hit = -1;
      for (const b of sorted) {
        const r = b.el.getBoundingClientRect();
        if (
          e.clientX >= r.left &&
          e.clientX <= r.right &&
          e.clientY >= r.top &&
          e.clientY <= r.bottom
        ) {
          hit = bodies.indexOf(b);
          break;
        }
      }
      if (hit >= 0) {
        e.preventDefault();
        stage.setPointerCapture(e.pointerId);
        const b = bodies[hit];
        drag = {
          i: hit,
          sx: e.clientX,
          sy: e.clientY,
          px: e.clientX,
          py: e.clientY,
          vx: 0,
          vy: 0,
          moved: false,
        };
        b.el.classList.add("is-dragging");
        b.p.x = px;
        b.p.y = py;
        b.target.x = px;
        b.target.y = py;
        b.target.z = 90;
        b.target.s = 1.08;
      } else {
        spinning = true;
        spinLast = { x: e.clientX, y: e.clientY };
        stage.setPointerCapture(e.pointerId);
      }
    };

    const onPointerUp = () => {
      if (drag) {
        const b = bodies[drag.i];
        b.el.classList.remove("is-dragging");
        if (drag.moved) {
          b.v.x = drag.vx * 60;
          b.v.y = drag.vy * 60;
        } else {
          const id = b.id;
          document
            .getElementById("templates")
            ?.scrollIntoView({ behavior: "smooth" });
          window.dispatchEvent(
            new CustomEvent("docify:select-template", { detail: { id } }),
          );
        }
        drag = null;
      }
      spinning = false;
      spinLast = null;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      phaseV += e.deltaY * 0.0001 + e.deltaX * 0.0001;
    };

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const t = now / 1000 - t0;
      const n = bodies.length;

      bodies.forEach((b) => {
        if (!b.released && t >= b.releaseAt) {
          b.released = true;
          b.v.x += (Math.random() - 0.5) * 320;
          b.v.y += (Math.random() - 0.5) * 240;
          b.v.z += 70;
          b.v.s += 1.5;
          b.v.o += 2;
        }
      });

      phase += phaseV + 0.03 * Math.min(dt, 0.05);
      phaseV *= 0.93;

      let hover = -1;
      let best = Infinity;
      if (!drag) {
        bodies.forEach((b, i) => {
          const d = Math.hypot(mx * W - b.p.x, my * H - b.p.y);
          if (d < CW * 0.7 && d < best) {
            best = d;
            hover = i;
          }
        });
      }
      hoverRef.current = hover;

      bodies.forEach((b, i) => {
        if (drag && drag.i === i) return;
        if (!b.released) {
          b.target.x = ring.cx;
          b.target.y = H * 0.5;
          b.target.s = 0.18;
          b.target.o = 0;
          return;
        }

        const depth = 0.55 + b.seed * 0.8;
        const u = phase / (Math.PI * 2) + i / n;
        const pos = sampleRing(ring, u);
        let x = pos.x;
        let y = pos.y;
        let s = 1;

        const dxC = x - ring.cx;
        if (Math.abs(dxC) < 0.22 * W) {
          const f = 1 - Math.abs(dxC) / (0.22 * W);
          y -= f * (0.14 * H + 0.28 * CH);
          s = 1 - f * 0.22;
        }

        x += (mx - 0.5) * -32 * depth;
        y += (my - 0.5) * -22 * depth;
        y += Math.sin(t * 0.7 + i * 1.7) * 4;

        const rdx = x - mx * W;
        const rdy = y - my * H;
        const rd = Math.hypot(rdx, rdy);
        if (rd < 1.2 * CW && rd > 1) {
          const push = (1 - rd / (1.2 * CW)) * 0.3 * CW;
          x += (rdx / rd) * push;
          y += (rdy / rd) * push;
        }

        b.target.x = x;
        b.target.y = y;
        b.target.z = hover === i ? 60 : 0;
        b.target.s = hover === i ? s * 1.06 : s;
        b.target.rx = (my - 0.5) * -14;
        b.target.ry = (mx - 0.5) * 18;
        b.target.rz = hover === i ? b.tilt * 0.4 : b.tilt + Math.sin(t * 0.5 + i) * 2;
        b.target.o = 1;
      });

      const steps = 4;
      const h = Math.min(dt, 0.033) / steps;
      for (let s = 0; s < steps; s++) {
        bodies.forEach((b, i) => {
          const keys =
            drag && drag.i === i
              ? (["z", "rx", "ry", "rz", "s", "o"] as SpringKeys[])
              : KEYS;
          keys.forEach((k) => {
            const [p, v] = springStep(b.p[k], b.v[k], b.target[k], K[k], DAMP[k], h);
            b.p[k] = p;
            b.v[k] = v;
          });
        });
      }

      const order = [...bodies].sort((a, b) => a.p.z - b.p.z);
      order.forEach((b, i) => {
        b.el.style.zIndex = String(10 + i);
      });

      bodies.forEach((b) => {
        b.el.style.opacity = String(Math.max(0, Math.min(1, b.p.o)));
        b.el.style.transform =
          `translate3d(${b.p.x - CW / 2}px, ${b.p.y - CH / 2}px, ${b.p.z}px) ` +
          `rotateZ(${b.p.rz}deg) rotateX(${b.p.rx}deg) rotateY(${b.p.ry}deg) scale(${b.p.s})`;
        const lift = Math.max(0, b.p.z) / 100;
        b.shadow.style.transform =
          `translate3d(${b.p.x - CW / 2}px, ${b.p.y + CH * 0.48 * b.p.s + 8 + lift * 24}px, 0) ` +
          `scale(${b.p.s * (1 + lift * 0.2)}, ${0.35 + lift * 0.25})`;
        b.shadow.style.opacity = String(Math.max(0, b.p.o * (0.5 - lift * 0.3)));
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      stage.innerHTML = "";
      bodiesRef.current = [];
    };
  }, [stageRef, templates, enabled]);
}
