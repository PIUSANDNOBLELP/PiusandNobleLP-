import sanitizeHtml from "sanitize-html";

// Sanitizes the HTML stored by the Tiptap rich-text editor before it is
// rendered on the public insight page. Only the tags/styles the editor can
// actually produce are allowed; everything else (scripts, event handlers,
// iframes, etc.) is stripped.
export function sanitizeInsightHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "h1",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "hr",
      "a",
      "img",
      "mark",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
      "*": ["style"],
    },
    allowedStyles: {
      "*": {
        color: [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/],
        "background-color": [/^#[0-9a-fA-F]{3,8}$/],
        "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: true,
  });
}
