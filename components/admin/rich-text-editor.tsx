"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import { useEffect, useRef } from "react";

function getMarkdown(editor: Editor): string {
  return (editor.storage as unknown as { markdown: { getMarkdown: () => string } }).markdown.getMarkdown();
}

// Stores and renders Markdown so the saved `body` stays compatible with the
// plain-textarea editor (Updates) and the public ReactMarkdown renderer —
// this is purely a nicer input experience for long-form Insight content.
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
      Markdown.configure({ html: false }),
    ],
    content: defaultValue ?? "",
    editorProps: {
      attributes: {
        class:
          "prose-insight-edit min-h-[320px] max-w-none border border-ink/20 bg-paper-deep p-4 text-base leading-relaxed outline-none focus:border-gold",
      },
    },
  });

  // Keep the hidden form field in sync so the surrounding <form action={...}>
  // submits the editor's Markdown output like any other field.
  useEffect(() => {
    if (!editor) return;
    const sync = () => {
      if (hiddenRef.current) hiddenRef.current.value = getMarkdown(editor);
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

  const items: { label: string; action: () => void; active: () => boolean }[] = [
    { label: "B", action: () => editor.chain().focus().toggleBold().run(), active: () => editor.isActive("bold") },
    { label: "I", action: () => editor.chain().focus().toggleItalic().run(), active: () => editor.isActive("italic") },
    { label: "H2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: () => editor.isActive("heading", { level: 2 }) },
    { label: "H3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: () => editor.isActive("heading", { level: 3 }) },
    { label: "“ ”", action: () => editor.chain().focus().toggleBlockquote().run(), active: () => editor.isActive("blockquote") },
    { label: "• List", action: () => editor.chain().focus().toggleBulletList().run(), active: () => editor.isActive("bulletList") },
    { label: "1. List", action: () => editor.chain().focus().toggleOrderedList().run(), active: () => editor.isActive("orderedList") },
    {
      label: "Link",
      action: () => {
        const url = window.prompt("Link URL");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      },
      active: () => editor.isActive("link"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 border border-b-0 border-ink/20 bg-paper p-2">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.action}
          className={`rounded-sm px-3 py-1.5 text-sm transition-colors ${
            item.active() ? "bg-ink text-paper" : "text-ink/70 hover:bg-paper-deep"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
