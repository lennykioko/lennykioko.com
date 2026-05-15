import sanitizeHtml from "sanitize-html";

const allowedTags = [...sanitizeHtml.defaults.allowedTags, "img"];

const allowedAttributes: sanitizeHtml.IOptions["allowedAttributes"] = {
  ...sanitizeHtml.defaults.allowedAttributes,
  "*": ["class", "id"],
  a: ["href", "name", "target", "rel"],
  img: ["src", "alt", "title", "width", "height", "loading"],
};

const options: sanitizeHtml.IOptions = {
  allowedTags,
  allowedAttributes,
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: { img: ["http", "https", "data"] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        ...(attribs.href && /^https?:\/\//i.test(attribs.href)
          ? { rel: "noopener noreferrer", target: attribs.target ?? "_blank" }
          : {}),
      },
    }),
  },
};

export function sanitize(html: string): string {
  return sanitizeHtml(html, options);
}

// Escape `<` so `</script>` in a value can't terminate the surrounding
// JSON-LD <script> tag. JSON parsers still accept <.
export function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}
