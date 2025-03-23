---
theme: purplin
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# some information about your slides (markdown enabled)
title: Conform in Remix Personal Observations
info: |
  Conform in Remix Personal Observations (RemixでConformを使って感じたこと)
# apply unocss classes to the current slide
# class: text-center
colorSchema: 'dark'
# https://sli.dev/features/drawing
drawings:
  enabled: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
canvasWidth: 960
---

<style>
.slidev-layout {
  padding-top: 0 !important;
}

</style>

# Conform in Remix Personal Observations
## ogadra

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

# ogadra

Motto: Done is better than perfect.

Favorite languages: Typescript, Go

<!--
  スライドは英語で書くが、発表は日本語で行う
-->

---

## Thema

<div class="my-8 text-09675">
```
 ███████╗  ██████╗  ███╗  ██╗ ████████╗  ██████╗  ███████╗  ███╗ ███╗
██╔═════╝ ██╔═══██╗ ████╗ ██║ ██╔═════╝ ██╔═══██╗ ██╔═══██╗ ████████║
██║       ██║   ██║ ██╔██╗██║ ███████╗  ██║   ██║ ███████╔╝ ██╔██╔██║
██║       ██║   ██║ ██║╚████║ ██╔════╝  ██║   ██║ ██╔═══██╗ ██║╚═╝██║
╚███████╗ ╚██████╔╝ ██║ ╚███║ ██║       ╚██████╔╝ ██║   ██║ ██║   ██║
 ╚══════╝  ╚═════╝  ╚═╝  ╚══╝ ╚═╝        ╚═════╝  ╚═╝   ╚═╝ ╚═╝   ╚═╝
```
</div>
A type-safe form validation library utilizing web fundamentals to progressively enhance HTML Forms with full support for server frameworks like Remix and Next.js.


<!--
  Web標準に則ってHTMLフォームを段階的に強化する、型安全なフォーム検証ライブラリ。
-->
---

## HOW TO USE

<div class="my-2">
```tsx {|5-12}
export default function Index() {
	const actionData = useActionData<typeof action>();
	const { state } = useNavigation();

	const [form, { userName }] = useForm({
		onValidate: ({ formData }) => {
			return parseWithValibot(formData, {
				schema: clientSchema,
			});
		},
		lastResult: actionData?.lastResult,
	});
```
</div>


---

## HOW TO USE

<div class="text-09675 my-5">

```tsx {|3,7}
return (
  <Form
    {...getFormProps(form)}
  >
    <label>username</label>
    <Input
      {...getInputProps(userName, { type: "text" })}
    />
    {userName.errors?.map((e) => (<div key={e}>{e}</div>))}
    <button>{state !== "submitting" ? "Join" : "Sending..."}</button>
  </Form>
);

```
</div>

---

## Result

![onSubmitValidation](./imgs/onSubmitValidation.gif)

<div class="text-center">
Error messages appear when submitting.
</div>

<!--
  サブミット時にエラーメッセージが表示される。
-->

---

## Error messages appear on input

<div class="my-12">
```tsx {2}
const [form, { userName }] = useForm({
  shouldValidate: "onInput",
  onValidate: ({ formData }) => {
    return parseWithValibot(formData, {
      schema: baseSchema,
    });
  },
  lastResult: actionData?.lastResult,
});
```
</div>

---

## Result

![onInputValidation](./imgs/onInputValidation.gif)

<div class="text-center">
Error messages appear on input.
</div>

---

## Why Do We Perform Validation on the Frontend?

<div class="my-3">
To enhance User Experience. We want to implement validation to help users achieve their goals with as few clicks or taps as possible.
</div>

<!--
  ## なぜ我々はフロントエンドでバリデーションするのか？
  > User Experience向上のため。1クリック、タップでも少なく、ユーザーが目的を達成させるためにバリデーションしたい。
-->

---

## Disable submit button when form is valid

<div class="text-094 my-2">

```tsx{10}
<Form
  {...getFormProps(form)}
>
  <label>username</label>
  <Input
    {...getInputProps(userName, { type: "text" })}
  />
  {userName.errors?.map((e) => (<div key={e}>{e}</div>))}
  <button
    disabled={!form.valid || !form.dirty || state === "submitting"}
  >
    {state !== "submitting" ? "Join" : "Sending..."}
  </button>
</Form>
```
</div>

---

## Result

![submitDisabledOnInvalidForm](./imgs/submitDisabledOnInvalidForm.gif)

<div class="text-center">
The submit button is disabled when the form is invalid.
</div>

---

## Thoughts

The documentation on form properties was not found, and the implementation was difficult. 😢

<!--
  formのプロパティに関するドキュメントが見当たらず、実装が大変だった
-->

---

## Async Validation (with Valibot)

### Frontend

<div class="my-4">
```typescript {|6-7}
const createClientSchema = pipe(
  baseSchema,
  forward(
    partialCheck(
      [["userName"]],
      () => { return false }, // always false
      conformValibotMessage.VALIDATION_UNDEFINED,
    ),
    ["userName"],
  ),
);
```
</div>

---

## Async Validation (with Valibot)

### Backend

<div class="text-094">

```typescript {|6-9}
const createServerSchema = pipeAsync(
  baseSchema,
  forwardAsync(
    partialCheckAsync(
      [["userName"]],
      async ({username}) => {
        return await checkUserName(username);
      },
      "This username is already in use.",
    ),
    ["userName"],
  ),
);
```

</div>

---

## Result

![asyncValidation](./imgs/asyncValidation.gif)

<div class="text-center">
The username is checked asynchronously on the server.
</div>

---

## How it works

When the form has changed, the frontend makes a request to the backend with the `__intent__` property.

When the form has the `__intent__` property, Conform returns only the validation result.

I believe this request sets `navigation.state` to `submitting`.

<!--
  フォームが変更されたとき、フロントエンドは`__intent__`プロパティとともにバックエンドにリクエストを送信する。
  このリクエストによって`navigation.state`が`submitting`に設定されると考えられる。
  フォームに`__intent__`プロパティが含まれているとき、Conformは検証結果のみを返す。
-->

---

## Thoughts

Because the `navigation.state` becomes `submitting`, the message `Sending...` is displayed during validation.

Could adding a "validating" property to the form help distinguish between the states?

<!--
  navigation.stateが"submitting"になってしまうため、validate時に`Sending...`と表示されてしまう。
  formのプロパティに`validating`があれば、`state`との区別がつくのではないか？
-->

---

## Thank you for listening!

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />
