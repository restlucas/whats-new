import {
  Image as ImageIcon,
  ListBullets,
  ListNumbers,
  Quotes,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextB,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
} from "@phosphor-icons/react";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

export function Editor({ content, onChange }: any) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Bold,
      Italic,
      Underline,
      Strike,
      TextAlign.configure({
        types: ["heading", "paragraph"], // Permite alinhamento nesses elementos
      }),
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content,
    onUpdate: ({ editor }) => {
      const currentContent = editor.getHTML();
      onChange(currentContent); // Atualiza o valor ao alterar o conteúdo
    },
  });

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col divide-y divide-tertiary/20 dark:divide-slate-600">
      <div className="control-group p-2">
        <div className="button-group flex items-center justify-start flex-wrap gap-1">
          <button
            className={`p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary ${editor.isActive("bold") ? "bg-tertiary/20 dark:bg-tertiary" : ""}`}
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <TextB size={20} />
          </button>
          <button
            className={`p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary ${editor.isActive("italic") ? "bg-tertiary/20 dark:bg-tertiary" : ""}`}
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <TextItalic size={20} />
          </button>
          <button
            className={`p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary ${editor.isActive("underline") ? "bg-tertiary/20 dark:bg-tertiary" : ""}`}
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <TextUnderline size={20} />
          </button>
          <button
            className={`p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary ${editor.isActive("strike") ? "bg-tertiary/20 dark:bg-tertiary" : ""}`}
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <TextStrikethrough size={20} />
          </button>
          <button
            className={`p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary ${
              editor.isActive({ textAlign: "left" })
                ? "bg-tertiary/20 dark:bg-tertiary"
                : ""
            }`}
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <TextAlignLeft size={20} />
          </button>
          <button
            className={`p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary ${
              editor.isActive({ textAlign: "center" })
                ? "bg-tertiary/20 dark:bg-tertiary"
                : ""
            }`}
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <TextAlignCenter size={20} />
          </button>
          <button
            className={`p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary ${
              editor.isActive({ textAlign: "right" })
                ? "bg-tertiary/20 dark:bg-tertiary"
                : ""
            }`}
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <TextAlignRight size={20} />
          </button>
          <button
            className={`p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary ${
              editor.isActive({ textAlign: "justify" })
                ? "bg-tertiary/20 dark:bg-tertiary"
                : ""
            }`}
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <TextAlignJustify size={20} />
          </button>
          <button
            className={`p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary ${editor.isActive("bulletList") ? "bg-tertiary/20 dark:bg-tertiary" : ""}`}
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListBullets size={20} />
          </button>
          <button
            className={`p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary ${editor.isActive("orderedList") ? "bg-tertiary/20 dark:bg-tertiary" : ""}`}
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListNumbers size={20} />
          </button>
          <button
            className="p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary"
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quotes size={20} />
          </button>
          <button
            className="p-2 rounded-md duration-100 hover:bg-tertiary/20 hover:dark:bg-tertiary"
            type="button"
            onClick={addImage}
          >
            <ImageIcon size={20} />
          </button>
        </div>
      </div>
      <EditorContent
        editor={editor}
        className="p-4 outline-none focus:outline-none"
      />
    </div>
  );
}
