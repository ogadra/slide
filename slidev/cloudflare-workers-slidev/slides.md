---
theme: purplin
title: 実行可能なスライドを作る
info: 実行可能なスライドを作る
colorSchema: 'dark'
drawings:
  enabled: true
transition: slide-left
mdc: true
canvasWidth: 960
---

<div style="height: 100px"/>

<h1>{{ $t('title.withBreak') }}</h1>

<div style="height: 30px" />

## ogadra


---

<h2>{{ $t('slide2.title') }}</h2>

<div class="center-content">

{{ $t('slide2.body1') }}

</div>

---

<h2>{{ $t('slide3.title') }}</h2>

<div class="center-content">

{{ $t('slide3.body1') }}

</div>

---

<h2>{{ $t('slide4.title') }}</h2>

<div class="center-content">

- {{ $t('slide4.body1') }}
- {{ $t('slide4.body2') }}

</div>

---

<h2>{{ $t('slide5.title') }}</h2>

<div class="center-content">

{{ $t('slide5.body1') }}

</div>

---

<div style="display: flex; align-items: center; justify-content: center; height: 100%; min-height: 500px;">
<p style="font-size: 10em !important; font-weight: bold; background: linear-gradient(90deg, #f87171, #fb923c, #fbbf24, #4ade80, #60a5fa, #818cf8, #c084fc, #f87171); background-size: 400% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: rainbow 3s linear infinite; white-space: nowrap;">{{ $t('slide6.body1') }}</p>
</div>

---

<div style="height: 100px"/>

<h1>{{ $t('slide7.title') }}</h1>

<div style="height: 50px"/>

## ogadra

---

<h2>{{ $t('slide8.title') }}</h2>

<div class="center-content">

{{ $t('slide8.body1') }}

</div>


---

<h2>{{ $t('slide9.title') }}</h2>

<div>
  <img
    src="./imgs/hono-cli-zenn.png"
    :alt="$t('slide9.alt')"
    class="w-120 mx-auto my-2"
  />
  </div>
  <div class="flex flex-wrap w-full mx-auto">
  <span class="text-center mx-auto">
  https://zenn.dev/yusukebe/articles/ff69c13ccafb28</span>
</div>

---

<h2>{{ $t('slide10.title') }}</h2>

<p style="font-size: 2em !important; margin-bottom: 0.5rem; width: 100%; text-align: center; margin: 20px auto;">{{ $t('slide10.body1') }}<span style="background: linear-gradient(transparent 60%, rgba(74, 222, 128, 0.6) 60%); font-weight: bold;">{{ $t('slide10.human') }}</span>{{ $t('slide10.and') }}<span style="background: linear-gradient(transparent 60%, rgba(96, 165, 250, 0.6) 60%); font-weight: bold;">{{ $t('slide10.ai') }}</span>{{ $t('slide10.body2') }}</p>

<div style="display: flex; gap: 1.5rem; justify-content: center; margin-top: 0.5rem;text-align: center;">
  <div style="background: rgba(74, 222, 128, 0.15); border: 1px solid #4ade80; border-radius: 8px; padding: 0.5rem 1rem 3rem 1rem; width: 450px;">
    <p style="font-size: 2em !important; color: #4ade80; margin-bottom: 0.5rem; border-bottom: 2px solid #4ade80; padding-bottom: 0.3rem;">{{ $t('slide10.human') }}</p>
    <p style="font-size: 1.5em !important; line-height: 1.5 !important; margin: 0;">{{ $t('slide10.humanTask1') }}</p>
    <p style="font-size: 1.5em !important; line-height: 1.5 !important; margin: 0;">{{ $t('slide10.humanTask2') }}</p>
  </div>
  <div style="background: rgba(96, 165, 250, 0.15); border: 1px solid #60a5fa; border-radius: 8px; padding: 0.5rem 1rem 3rem 1rem; width: 450px;">
    <p style="font-size: 2em !important; color: #60a5fa; margin-bottom: 0.5rem; border-bottom: 2px solid #60a5fa; padding-bottom: 0.3rem;">{{ $t('slide10.ai') }}</p>
    <p style="font-size: 1.5em !important; line-height: 1.5 !important; margin: 0;">{{ $t('slide10.aiTask1') }}</p>
    <p style="font-size: 1.5em !important; line-height: 1.5 !important; margin: 0;">{{ $t('slide10.aiTask2') }}</p>
  </div>
</div>

---

<h2>{{ $t('slide11.title') }}</h2>

{{ $t('slide11.body1') }}

<CodeBlock
  code="npm install -g @hono/cli"
  lang="bash"
  :editable="false"
/>

---


## hono request

<ScrollableContent maxHeight="380px">


{{ $t('slide12.body1') }}

```ts
import { Hono } from 'hono'
const app = new Hono()
app.get('/', (c) => c.text('Hello World!'))
export default app
```

{{ $t('slide12.body2') }} `hono request`

<CodeBlock
  code="hono request -P / example-1/index.ts"
  lang="bash"
  :editable="false"
/>

</ScrollableContent>


---

## hono serve

<SplitView leftWidth="500px">
<ScrollableContent maxHeight="380px">

{{ $t('slide13.body1') }}

```ts
import { Hono } from 'hono';
import { Page } from './page';

const app = new Hono<{
  Variables: { count: number; };
}>();

let counter = 0;

app.get('/', (c) => {
  counter++;
  c.set('count', counter);
  return Page(c);
});

export default app;"
  lang="TypeScript"
  filename="example-2/index.ts"
```

{{ $t('slide13.body2') }} `hono serve`

<CodeBlock
  code='hono serve example-2/index.ts \
    --use "logger()"'
  lang="bash"
  :editable="false"
/>

{{ $t('slide13.body3') }}

<CodeBlock
  code='lsof -ti:7070 | xargs kill -9'
  lang="bash"
  maxWidth="500px"
  :editable="false"
/>

</ScrollableContent>
</SplitView>


---

<h2>{{ $t('slide14.title') }}</h2>

<div class="center-content">

{{ $t('slide14.body1') }}

</div>


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

---

<h2>{{ $t('slide16.title') }}</h2>

<p style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.7em !important; font-weight: bold; margin: 0; white-space: nowrap;">{{ $t('slide16.body1') }}<span style="background: linear-gradient(transparent 60%, rgba(74, 222, 128, 0.5) 60%);">{{ $t('slide16.highlight') }}</span>{{ $t('slide16.body2') }}</p>

<p style="position: absolute; bottom: 4rem; left: 50%; transform: translateX(-50%); font-size: 0.85em !important; color: #fbbf24; background: rgba(251, 191, 36, 0.15); padding: 0.75rem 1rem; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.6rem;"><span style="display: inline-flex; align-items: center; justify-content: center; width: 1.4em; height: 1.4em; border: 2px solid #fbbf24; border-radius: 50%; font-size: 0.9em; font-weight: bold;">!</span> {{ $t('slide16.note') }}</p>

---

<h2>{{ $t('slide17.title') }}</h2>

<div style="display: flex; gap: 1rem; justify-content: center; align-items: stretch; margin-top: 3rem;">
  <div style="background: rgba(251, 146, 60, 0.15); border: 1px solid #fb923c; border-radius: 8px; padding: 1.5rem 1rem; width: 260px; text-align: center;">
    <p style="font-size: 1.2em !important; color: #fb923c; margin-bottom: 0.5rem; font-weight: bold;">Cloudflare Workers</p>
    <p style="font-size: 1em !important; color: #ccc; margin: 0;">{{ $t('slide17.cfDesc') }}</p>
  </div>
  <div style="background: rgba(96, 165, 250, 0.15); border: 1px solid #60a5fa; border-radius: 8px; padding: 1.5rem 1rem; width: 260px; text-align: center;">
    <p style="font-size: 1.2em !important; color: #60a5fa; margin-bottom: 0.5rem; font-weight: bold;">Durable Objects</p>
    <p style="font-size: 1em !important; color: #ccc; margin: 0;">{{ $t('slide17.doDesc') }}</p>
  </div>
  <div style="background: rgba(74, 222, 128, 0.15); border: 1px solid #4ade80; border-radius: 8px; padding: 1.5rem 1rem; width: 260px; text-align: center;">
    <p style="font-size: 1.2em !important; color: #4ade80; margin-bottom: 0.5rem; font-weight: bold;">Sandbox SDK</p>
    <p style="font-size: 1em !important; color: #ccc; margin: 0;">{{ $t('slide17.sandboxDesc') }}</p>
  </div>
</div>

<p style="position: absolute; bottom: 4rem; left: 50%; transform: translateX(-50%); font-size: 0.85em !important; color: #fbbf24; background: rgba(251, 191, 36, 0.15); padding: 0.75rem 1rem; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.6rem; white-space: nowrap;"><span style="display: inline-flex; align-items: center; justify-content: center; width: 1.4em; height: 1.4em; border: 2px solid #fbbf24; border-radius: 50%; font-size: 0.9em; font-weight: bold;">!</span> {{ $t('slide17.note') }}</p>

---

<h2>{{ $t('slide18.title') }}</h2>

<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 320px; text-align: center;">

<p style="font-size: 1.8em !important; margin-bottom: 1rem;">{{ $t('slide18.body1') }}</p>
<p style="font-size: 1.5em !important; color: #ccc; margin-bottom: 2rem;">{{ $t('slide18.body2') }}<span style="border-bottom: 2px solid #4ade80;">{{ $t('slide18.body3') }}</span>{{ $t('slide18.body4') }}</p>
<a style="font-size: 1.1rem !important; color: #888;" href="https://sandbox.cloudflare.com/">https://sandbox.cloudflare.com/</a>

</div>


---

<h2>{{ $t('slide19.title') }}</h2>

{{ $t('slide19.body1') }}

```ts{4}
app.post("/sandbox", async(c: Context, env: Env) => {
  const sandbox = getSandbox(env.Sandbox, 'user-123');

  const result = await sandbox.exec('python --version');
  return Response.json({
    output: result.stdout,
    exitCode: result.exitCode,
    success: result.success
  });
});

```
{{ $t('slide19.body2') }}

---

<h2>{{ $t('slide20.title') }}</h2>

{{ $t('slide20.body1') }}

```ts{4}
app.post("/sandbox/:slide", async(c: Context, env: Env) => {
  const { code } = await c.req.json();

  const sandbox = getSandbox(env.Sandbox, c.get("randomId"));
  const process = await sandbox.startProcess(code);
  return Response.json({ processId: process.id });
});

```

---

<h2>{{ $t('slide21.title') }}</h2>

{{ $t('slide21.body1') }}

<div class="flex justify-center items-center mt-6">
  <div class="flex items-center gap-6">
    <!-- Users -->
    <div class="flex flex-col items-center">
      <div class="flex flex-col gap-3">
        <div class="w-12 h-12 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center text-blue-400 font-bold text-lg">A</div>
        <div class="w-12 h-12 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center text-blue-400 font-bold text-lg">B</div>
        <div class="w-12 h-12 rounded-full border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center text-blue-400 font-bold text-lg">C</div>
      </div>
      <span class="text-blue-400 text-sm font-bold mt-2">Users</span>
    </div>
    <!-- Users -> Worker 矢印 -->
    <div class="flex flex-col gap-3">
      <div class="border-t-2 border-dashed border-blue-400 w-14 rotate-12"></div>
      <div class="border-t-2 border-dashed border-blue-400 w-14"></div>
      <div class="border-t-2 border-dashed border-blue-400 w-14 -rotate-12"></div>
    </div>
    <!-- Worker -->
    <div class="flex flex-col items-center">
      <div class="w-24 h-20 rounded-lg border-2 border-orange-400 bg-orange-400/20 flex items-center justify-center">
        <img src="./imgs/worker.svg" class="w-10 h-10" style="filter: invert(67%) sepia(89%) saturate(1015%) hue-rotate(346deg) brightness(101%) contrast(97%);" />
      </div>
      <span class="text-orange-400 text-sm font-bold mt-2">Worker</span>
    </div>
    <!-- Worker -> Container 矢印 -->
    <div class="flex flex-col gap-3">
      <div class="border-t-2 border-dashed border-green-400 w-14 -rotate-12"></div>
      <div class="border-t-2 border-dashed border-green-400 w-14"></div>
      <div class="border-t-2 border-dashed border-green-400 w-14 rotate-12"></div>
    </div>
    <!-- Containers -->
    <div class="flex flex-col items-center">
      <div class="flex flex-col gap-3">
        <div class="w-24 h-12 rounded border-2 border-green-400 bg-green-400/20 flex items-center justify-center">
          <img src="./imgs/container.svg" class="w-6 h-6" style="filter: invert(77%) sepia(47%) saturate(497%) hue-rotate(87deg) brightness(93%) contrast(92%);" />
        </div>
        <div class="w-24 h-12 rounded border-2 border-green-400 bg-green-400/20 flex items-center justify-center">
          <img src="./imgs/container.svg" class="w-6 h-6" style="filter: invert(77%) sepia(47%) saturate(497%) hue-rotate(87deg) brightness(93%) contrast(92%);" />
        </div>
        <div class="w-24 h-12 rounded border-2 border-green-400 bg-green-400/20 flex items-center justify-center">
          <img src="./imgs/container.svg" class="w-6 h-6" style="filter: invert(77%) sepia(47%) saturate(497%) hue-rotate(87deg) brightness(93%) contrast(92%);" />
        </div>
      </div>
      <span class="text-green-400 text-sm font-bold mt-2">Containers</span>
    </div>
  </div>
</div>

---

<h2>{{ $t('slide22.title') }}</h2>

{{ $t('slide22.body1') }}

```ts{6-13}
app.get("/sandbox/:slide/stream", async(c: Context) => {
  const slide = c.req.param("slide");
	const processId = c.req.query("processId");

	const sandbox = getSandbox(c.env.Sandbox, slide);
	const stream = await sandbox.streamProcessLogs(processId);
	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
})

```

---

<h2>{{ $t('slide23.title') }}</h2>

<p style="font-size: 1.2em !important; margin-bottom: 1.5rem;">{{ $t('slide23.body1') }}<code>example.com</code>{{ $t('slide23.body2') }}<code>*.example.com/*</code>{{ $t('slide23.body3') }}</p>

<div style="display: flex; gap: 1.5rem; justify-content: center; margin-top: 1rem;">
  <div style="background: rgba(148, 163, 184, 0.1); border: 1px solid #94a3b8; border-radius: 8px; padding: 1.2rem 1.5rem; width: 380px;">
    <p style="font-size: 1.1em !important; color: #94a3b8; margin-bottom: 0.5rem; font-weight: bold;">{{ $t('slide23.card1Title') }}</p>
    <p style="font-size: 0.95em !important; color: #aaa; margin: 0;">{{ $t('slide23.card1Desc') }}</p>
  </div>
  <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid #fbbf24; border-radius: 8px; padding: 1.2rem 1.5rem; width: 380px;">
    <p style="font-size: 1.1em !important; color: #fbbf24; margin-bottom: 0.5rem; font-weight: bold;">{{ $t('slide23.card2Title') }}</p>
    <p style="font-size: 0.95em !important; color: #aaa; margin: 0;">{{ $t('slide23.card2Desc') }}</p>
  </div>
</div>

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
