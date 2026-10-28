import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'




export function App() {


  const [s, setS] = useState<WebSocket | null>(null);
  const [msg, setMsg] = useState<string | null>(null);



  useEffect(() => {


    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      console.log('Connected to WebSocket server', ws);
      setS(ws);
    }

    ws.onmessage = (event) => {
      // console.log('Received message from server:', event.data);
      const data = JSON.parse(event.data)
      // console.log(data)

      if (event.data === "Connected to Docs Realtime Server") return;
      if (data.type === "setDocs") {
        console.log("Received setDocs message:", event.data);
        setMsg(data.content);

        editor?.chain()
          .setContent(data.content)
          .setMeta('preventEmit', true) // Attach custom metadata
          .run();

      }


      // editor?.commands.setContent(`${event.data}`);
    }

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setS(null);
    }

    return () => {
      ws.close();
    }


  }, [])


  if (s == null) {
    <div> Connecting to WebSocket... </div>
  }

  const editor = useEditor({

    extensions: [StarterKit], // define your extension array
    content: '<p>Hello World!</p>', // initial content
    onUpdate({ editor, transaction }) {
      // Check if this specific update was marked to be ignored


      // if (isProgrammatic) {
      //   return // Exit early, do not fire the WS call!
      // }

      // Otherwise, it was a user keystroke -> safe to emit

    }



  })


  const editorState = useEditorState({
    editor,

    // the selector function is used to select the state you want to react to
    selector: ({ editor }) => {
      if (!editor) return null;

      const t = editor.state.tr;
      const isProgrammatic = t.getMeta('preventEmit')
      console.log(' isProgrammatic ', isProgrammatic)

      if (!isProgrammatic) {
        return { content: editor.getJSON(), preventEmit: true };
      }

      // if(msg === editor.getText()) return;
      // console.log(s)
      return { content: editor.getText(), preventEmit: false };
      // s?.send(JSON.stringify({ type: "sendContent", content: editor.getText() }));

      return {
        isEditable: editor.isEditable,
        currentSelection: editor.state.selection,
        currentContent: editor.getText(),
        // you can add more state properties here e.g.:
        // isBold: editor.isActive('bold'),
        // isItalic: editor.isActive('italic'),
      };
    },
  });


  useEffect(() => {
    s?.send(JSON.stringify({ type: "sendContent", content: editorState?.content }));
  }, [editorState])


  // console.log(editorState?.currentContent)




  return (
    <div>
      <>
        <EditorContent editor={editor} />
        <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
      </>


      <h1> this is independent bhai </h1>

      {/* <p> {  editorState?.currentContent.toString() }</p> */}
    </div>
  );
}
