// Both values reach the page as raw markup: the title comes from a deck's
// headmatter and the image URL is built from the request.
const escapeAttribute = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

class HeadHandler {
  content: string;
  title: string;
  constructor(content: string, title: string) {
    this.content = escapeAttribute(content);
    this.title = escapeAttribute(title);
  }

  element(element: any) {
    element.append(
      `  <meta property="og:image" content="${this.content}" />\n`,
      { html: true }
    )

    element.append(
      `  <meta name="twitter:card" content="summary_large_image" />\n`,
      { html: true }
    )

    element.append(
      `  <meta name="twitter:image" content="${this.content}" />\n`,
      { html: true }
    )

    // Slidev already writes an og:title, so appending one here would leave the
    // page with two. What Slidev emits carries its ` - Slidev` suffix and stays
    // as it is; the tags below are ours and use the bare title.
    element.append(
      `  <meta name="twitter:title" content="${this.title}" />\n`,
      { html: true }
    )
    element.append(
      `  <meta name="twitter:text:title" content="${this.title}" />\n`,
      { html: true }
    )
  }
}

export { HeadHandler }
