import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          editor.chain().focus().toggleBold().run();
        }}
        className={`btn btn-sm ${editor.isActive("heading", { level: 2 }) ? "btn-active" : ""}`}
      >
        Group Title
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`btn btn-sm ${editor.isActive("bulletList") ? "btn-active" : ""}`}
      >
        Item List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`btn btn-sm ${editor.isActive("highlight") ? "btn-active" : ""}`}
      >
        Highlight
      </button>
    </div>
  );
};

const RecipeEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2],
        },
      }),
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none",
      },
    },
  });

  return (
    <div className="border border-gray-300 rounded p-4">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RecipeEditor;
