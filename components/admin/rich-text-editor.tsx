"use client";

import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

// Full-featured rich text editor for long-form Insight content. Stores HTML
// (Tiptap's native format), which the public insight page renders as sanitized
// HTML — this replaces the old Markdown-based editor so we can offer a
// Word-like toolbar (headings, alignment, colour, highlight, images, etc.).

export function RichTextEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const hiddenRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "Write the insight here…" }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false }),
    ],
    content: defaultValue ?? "",
    editorProps: {
      attributes: {
        class:
          "prose-insight-edit min-h-[360px] max-w-none border border-ink/20 bg-paper-deep p-4 text-base leading-relaxed outline-none focus:border-gold",
      },
    },
  });

  // Keep the hidden form field in sync with the editor's HTML so the
  // surrounding <form action={...}> submits it like any other field.
  useEffect(() => {
    if (!editor) return;
    const sync = () => {
      if (hiddenRef.current) hiddenRef.current.value = editor.getHTML();
    };
    sync();
    editor.on("update", sync);
    return () => {
      editor.off("update", sync);
    };
  }, [editor]);

  return (
    <div>
      <input ref={hiddenRef} type="hidden" name={name} defaultValue={defaultValue} />
      <div className="mt-2">
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const chain = () => editor.chain().focus();

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border border-b-0 border-ink/20 bg-paper p-2">
      {/* Text style */}
      <Group>
        <Btn onClick={() => chain().toggleBold().run()} active={editor.isActive("bold")} title="Bold" label="B" bold />
        <Btn onClick={() => chain().toggleItalic().run()} active={editor.isActive("italic")} title="Italic" label="I" italic />
        <Btn onClick={() => chain().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline" label="U" underline />
        <Btn onClick={() => chain().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough" label="S" strike />
        <Btn onClick={() => chain().toggleCode().run()} active={editor.isActive("code")} title="Inline code" label="</>" mono />
        <Btn onClick={() => chain().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight" label="Hl" highlight />
      </Group>

      {/* Colour */}
      <Group>
        <label
          className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1.5 text-sm text-ink/70 hover:bg-paper-deep"
          title="Text colour"
        >
          <span
            className="inline-block h-4 w-4 rounded-sm border border-ink/30"
            style={{ background: editor.getAttributes("textStyle").color ?? "transparent" }}
          />
          <input
            type="color"
            className="h-0 w-0 opacity-0"
            onChange={(e) => chain().setColor(e.target.value).run()}
            value={editor.getAttributes("textStyle").color ?? "#000000"}
          />
        </label>
        <Btn
          onClick={() => chain().unsetColor().run()}
          active={false}
          title="Clear colour"
          label="✕"
        />
      </Group>

      <Divider />

      {/* Blocks / headings */}
      <Group>
        <Btn onClick={() => chain().setParagraph().run()} active={editor.isActive("paragraph")} title="Paragraph" label="P" />
        <Btn onClick={() => chain().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1" label="H1" />
        <Btn onClick={() => chain().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2" label="H2" />
        <Btn onClick={() => chain().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3" label="H3" />
        <Btn onClick={() => chain().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="Heading 4" label="H4" />
      </Group>

      <Divider />

      {/* Alignment */}
      <Group>
        <Btn onClick={() => chain().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align left" label="⯇" />
        <Btn onClick={() => chain().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align center" label="≡" />
        <Btn onClick={() => chain().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align right" label="⯈" />
        <Btn onClick={() => chain().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify" label="⧉" />
      </Group>

      <Divider />

      {/* Lists & blocks */}
      <Group>
        <Btn onClick={() => chain().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list" label="•" />
        <Btn onClick={() => chain().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list" label="1." />
        <Btn onClick={() => chain().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote" label="❝" />
        <Btn onClick={() => chain().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code block" label="{}" />
        <Btn onClick={() => chain().setHorizontalRule().run()} active={false} title="Horizontal rule" label="—" />
      </Group>

      <Divider />

      {/* Insert */}
      <Group>
        <Btn
          onClick={() => {
            const url = window.prompt("Link URL");
            if (url === null) return;
            if (url === "") {
              chain().unsetLink().run();
              return;
            }
            chain().setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
          title="Link"
          label="🔗"
        />
        <Btn
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) chain().setImage({ src: url }).run();
          }}
          active={false}
          title="Image"
          label="🖼"
        />
      </Group>

      <Divider />

      {/* History & clear */}
      <Group>
        <Btn onClick={() => chain().undo().run()} active={false} title="Undo" label="↺" disabled={!editor.can().undo()} />
        <Btn onClick={() => chain().redo().run()} active={false} title="Redo" label="↻" disabled={!editor.can().redo()} />
        <Btn onClick={() => chain().clearNodes().unsetAllMarks().run()} active={false} title="Clear formatting" label="Clear" />
      </Group>
    </div>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-ink/15" aria-hidden />;
}

function Btn({
  onClick,
  active,
  title,
  label,
  disabled,
  bold,
  italic,
  underline,
  strike,
  mono,
  highlight,
}: {
  onClick: () => void;
  active: boolean;
  title: string;
  label: string;
  disabled?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`rounded-sm px-2 py-1.5 text-sm leading-none transition-colors disabled:opacity-30 ${
        active ? "bg-ink text-paper" : "text-ink/70 hover:bg-paper-deep"
      } ${bold ? "font-bold" : ""} ${italic ? "italic" : ""} ${underline ? "underline" : ""} ${
        strike ? "line-through" : ""
      } ${mono ? "font-mono" : ""} ${highlight ? "bg-gold/30" : ""}`}
    >
      {label}
    </button>
  );
}
