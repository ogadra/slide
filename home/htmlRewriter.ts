const rewriter = new HTMLRewriter();

class HeadHandler {
  content: string;
  title: string;
  constructor(content: string, title: string) {
    this.content = content;
    this.title = title;
  }

  element(element: any) {
    element.append(
      `  <meta property="og:image" content="${this.content}" />\n`,
      { html: true }
    )

    element.append(
      `  <meta property="twitter:card" content="summary_large_image" />\n`,
      { html: true }
    )

    element.append(
      `  <meta property="twitter:image" content="${this.content}" />\n`,
      { html: true }
    )

    element.append(
      `  <meta property="og:title" content="${this.title}" />\n`,
      { html: true }
    )
    element.append(
      `  <meta property="twitter:title" content="${this.title}" />\n`,
      { html: true }
    )
    element.append(
      `  <meta property="twitter:text:title" content="${this.title}" />\n`,
      { html: true }
    )
  }
  text(text: any) {
    const regex = / - Slidev$/;
    if (regex.test(text.text)) {
      const title = text.text.replace(regex, "");
      text.replace(
        title,
        { html: true }
      );
    }
  }
}

export { rewriter, HeadHandler }
