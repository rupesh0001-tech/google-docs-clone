import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'




export  function App() {

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: '<p>Hello World!</p>', // initial content
  })


const editorState = useEditorState({
    editor,

    // the selector function is used to select the state you want to react to
    selector: ({ editor }) => {
      if (!editor) return null;

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


  console.log(editorState?.currentContent)


  

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
