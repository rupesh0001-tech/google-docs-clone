import express from "express";
import cors from "cors";
import http from "http";
import  { WebSocketServer, WebSocket } from "ws";
import { prisma } from "@repo/db";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", async (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Example route using Prisma client
app.get("/api/documents", async (_req, res) => {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server on the same HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected via WebSocket");

  ws.send(JSON.stringify({ type: "WELCOME", message: "Connected to Docs Realtime Server" }));
  console.log("Sending welcome message to client");

  ws.on("message", (data) => {
    try {
      // console.log("Received WS message:", data);
      const message = JSON.parse(data.toString());
      console.log("Received WS message:", message);


      if (message.type === "sendContent") {
        console.log("Received setDocs message:", message);
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "setDocs", content: message.content }));
          }
        });
      }
      // Here you can handle the setDocs message, e.g., save to database or broadcast to other clients
    }

      // Echo / broadcast message back to clients
      // wss.clients.forEach((client) => {
      //   if (client !== ws && client.readyState === WebSocket.OPEN) {
      //     client.send(JSON.stringify(message));
      //   }
      // });
    // }
     catch (err) {
    console.error("Invalid WS message format", err);
  }



  ws.on("close", () => {
  console.log("Client disconnected");
});
});
})


  

server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`WebSocket server active on ws://localhost:${PORT}`);
});