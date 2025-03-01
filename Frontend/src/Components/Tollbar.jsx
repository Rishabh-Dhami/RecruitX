import { Bold, Italic, Underline, List, ListOrdered, Link, Image as ImageIcon } from "lucide-react";

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-2 p-2 border-b bg-black rounded-t-lg">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className="p-2 hover:bg-gray-200 rounded">
        <Bold size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className="p-2 hover:bg-gray-200 rounded">
        <Italic size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="p-2 hover:bg-gray-200 rounded">
        <Underline size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="p-2 hover:bg-gray-200 rounded">
        <List size={18} />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="p-2 hover:bg-gray-200 rounded">
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => {
          const url = prompt("Enter a URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className="p-2 hover:bg-gray-200 rounded"
      >
        <Link size={18} />
      </button>
      <button
        onClick={() => {
          const url = prompt("Enter image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
        className="p-2 hover:bg-gray-200 rounded"
      >
        <ImageIcon size={18} />
      </button>
    </div>
  );
};

export default Toolbar;
