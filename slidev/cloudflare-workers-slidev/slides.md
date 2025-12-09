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

<div style="height: 100px"/>

# 実行可能な
# スライドを作る

<div style="height: 30px" />

## ogadra


---

## なぜ登壇するのか

<div class="center-content">

知見・経験を共有したいから

</div>

---

## 知見の共有「だけ」で満足？

<div class="center-content">

聞いて終わる話は「忘れられる」

=> 実際に「手を動かして」もらいたい

</div>

---

## そんなこと、できるの？

<div class="center-content">

- PCを持参 -> 環境構築？
- LTは5分しかない

</div>

---

## だから「実行可能な」スライドを作る

<div class="center-content">

登壇中に全員が「試せる」環境を

スライドに「埋め込む」

</div>

---

<div style="display: flex; align-items: center; justify-content: center; height: 100%; min-height: 500px;">
<p style="font-size: 10em !important; font-weight: bold; background: linear-gradient(90deg, #f87171, #fb923c, #fbbf24, #4ade80, #60a5fa, #818cf8, #c084fc, #f87171); background-size: 400% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: rainbow 3s linear infinite;">デモLT</p>
</div>

---

<div style="height: 100px"/>

# 5分後。
# あなたはHono CLI経験者

<div style="height: 50px"/>

## ogadra

---

## Hono CLI触ったことのある方、挙手！

<div class="center-content">

今日は全員の挙手を目標とします

</div>

---

## Hono CLIとは

<div>
  <img
    src="./imgs/hono-cli-zenn.png"
    alt="Hono CLI 爆誕というzennのサイトのスクリーンショット"
    class="w-120 mx-auto my-2"
  />
  </div>
  <div class="flex flex-wrap w-full mx-auto">
  <span class="text-center mx-auto">
  https://zenn.dev/yusukebe/articles/ff69c13ccafb28</span>
</div>

---

## Hono CLIとは

<p style="font-size: 2em !important; margin-bottom: 0.5rem; width: 100%; text-align: center; margin: 20px auto;"><span style="background: linear-gradient(transparent 60%, rgba(74, 222, 128, 0.6) 60%); font-weight: bold;">人間</span>と<span style="background: linear-gradient(transparent 60%, rgba(96, 165, 250, 0.6) 60%); font-weight: bold;">AI</span>のためのCLI</p>

<div style="display: flex; gap: 1.5rem; justify-content: center; margin-top: 0.5rem;text-align: center;">
  <div style="background: rgba(74, 222, 128, 0.15); border: 1px solid #4ade80; border-radius: 8px; padding: 0.5rem 1rem 3rem 1rem; width: 450px;">
    <p style="font-size: 2em !important; color: #4ade80; margin-bottom: 0.5rem; border-bottom: 2px solid #4ade80; padding-bottom: 0.3rem;">人間</p>
    <p style="font-size: 1.5em !important; line-height: 1.5 !important; margin: 0;">動作確認する</p>
    <p style="font-size: 1.5em !important; line-height: 1.5 !important; margin: 0;">最適化する</p>
  </div>
  <div style="background: rgba(96, 165, 250, 0.15); border: 1px solid #60a5fa; border-radius: 8px; padding: 0.5rem 1rem 3rem 1rem; width: 450px;">
    <p style="font-size: 2em !important; color: #60a5fa; margin-bottom: 0.5rem; border-bottom: 2px solid #60a5fa; padding-bottom: 0.3rem;">AI</p>
    <p style="font-size: 1.5em !important; line-height: 1.5 !important; margin: 0;">ドキュメントを読む</p>
    <p style="font-size: 1.5em !important; line-height: 1.5 !important; margin: 0;">動作確認する</p>
  </div>
</div>


---



---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

## Thank you for listening!

Done is better than perfect.

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />

