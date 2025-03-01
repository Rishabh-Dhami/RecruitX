import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Tollbar";
 // Custom toolbar

const TiptapEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="bg-black text-white shadow-md rounded-lg border border-yellow-300 h-full overflow-y-auto">
    
      {editor && <Toolbar editor={editor} />}

      
      <div className="p-2">
        <EditorContent editor={editor} className="min-h-[300px] bg-black border-0 border-none outline-none" />
      </div>
    </div>
  );
};

export default TiptapEditor;
