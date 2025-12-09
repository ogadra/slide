---
theme: purplin
title: WorkersでSlidevを120%活かす！
info: WorkersでSlidevを120%活かす！
colorSchema: 'dark'
drawings:
  enabled: true
transition: slide-left
mdc: true
canvasWidth: 960
---

<style>
.slidev-layout {
  padding-top: 0 !important;
}

</style>

## コード実行サンプル

<SplitView leftWidth="500px">
  <ScrollableContent maxHeight="400px">

  <CodeBlock
    code="npm install -g @hono/cli"
    lang="bash"
    maxWidth="500px"
  />

  <CodeBlock
    code="import { Hono } from 'hono'
const app = new Hono()
app.get('/', (c) => c.text('Hello World'))
export default {
  port: 7070,
  host: '0.0.0.0',
  fetch: app.fetch,
}"
    lang="TypeScript"
    filename="example-1.ts"
    maxWidth="500px"
  />
    <CodeBlock
      code='lsof -ti:7070 | xargs kill -9'
      lang="bash"
      maxWidth="500px"
    />
    <CodeBlock
      code='hono serve example-1.ts'
      lang="bash"
      maxWidth="500px"
    />
  </ScrollableContent>
</SplitView>

---

<ScrollableContent maxHeight="380px">


<CodeBlock
  code="import { Hono } from 'hono'
const app = new Hono()
app.get('/', (c) => c.text('Hello World'))
export default {
  port: 7070,
  host: '0.0.0.0',
  fetch: app.fetch,
}"
  lang="TypeScript"
  filename="/workspace/example-1.ts"
/>

<CodeBlock code='hono serve example-1.ts' lang="bash" />

</ScrollableContent>


---


## コード実行サンプル

<ScrollableContent maxHeight="380px">

<CodeBlock
  code="import { Hono } from 'hono'
const app = new Hono()
app.get('/', (c) => c.text('Hello World'))
export default app"
  lang="TypeScript"
  filename="/workspace/example-1.ts"
/>

<CodeBlock code="hono request -P / /workspace/example-1.ts" lang="bash" />

</ScrollableContent>

---

## hono/cliのインストール

<CodeBlock
  code="npm install -g @hono/cli"
  lang="bash"
/>

---

## 

<CodeBlock
  code="console.log('Hello World!');"
  lang="TypeScript"
  filename="/workspace/example-1.ts"
/>

<CodeBlock code="npx tsx /workspace/example-1.ts" lang="bash" />


---

# WorkersでSlidevを120%活かす！
## ogadra

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

# ogadra

Motto: Done is better than perfect.

Languages: TypeScript, Go <br/>
Contributions: Playwright MCP

---

## Thank you for listening!

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />

