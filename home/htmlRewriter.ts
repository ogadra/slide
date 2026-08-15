// Both values are interpolated into raw markup.
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

    // Slidev writes its own og:title, which is left alone.
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
