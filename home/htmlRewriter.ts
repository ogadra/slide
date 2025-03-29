const rewriter = new HTMLRewriter();

class ElementHandler {
  content: string;
  constructor(content: string) {
    this.content = content;
  }

  element(element:any) {
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
}
}

async function handleRequest(req) {
  const res = await fetch(req);

  return 
}

rewriter.on('head', {
    
})

export { rewriter, ElementHandler }
