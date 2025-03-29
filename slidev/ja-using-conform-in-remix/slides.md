---
theme: purplin
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# some information about your slides (markdown enabled)
title: RemixでConformを使って感じたこと
info: RemixでConformを使って感じたこと (Conform in Remix Personal Observations)
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

# RemixでConformを使って感じたこと
## ogadra

---
layout: image-x
image: https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif
imageOrder: 2
---

# ogadra

Motto: Done is better than perfect.

Favorite languages: Typescript, Go


---

## テーマ

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

Conformは、Web標準に則ってHTMLフォームを段階的に強化する、型安全なフォーム検証ライブラリです。
RemixやNext.jsなどのフレームワークと組み合わせて使うことができます。

<!--
  今回のテーマは、せっかくエドモンドさんがいらしてくださったので、Conformについて話します。

  Conformは、Web標準に則ってHTMLフォームを段階的に強化する、型安全なフォーム検証ライブラリです。
-->
---

## 使い方

<div class="my-2">

```tsx {|5-12}
export default function Index() {
	const actionData = useActionData<typeof action>();
	const { state } = useNavigation();

	const [form, { username }] = useForm({
		onValidate: ({ formData }) => {
			return parseWithValibot(formData, {
				schema: clientSchema,
			});
		},
		lastResult: actionData?.lastResult,
	});
```
</div>


<!--
  使い方は、`useForm`を使ってフォームを作成して
-->
---

## 使い方

<div class="text-09675 my-5">

```tsx {|3,7}
return (
  <Form
    {...getFormProps(form)}
  >
    <label>username</label>
    <Input
      {...getInputProps(username, { type: "text" })}
    />
    {username.errors?.map((e) => (<div key={e}>{e}</div>))}
    <button>{state !== "submitting" ? "Join" : "Sending..."}</button>
  </Form>
);

```
</div>

<!--
  FormやInputに`getFormProps`や`getInputProps`を渡してあげるだけです。
-->

---

## 結果

![onSubmitValidation](../using-conform-in-remix/imgs/onSubmitValidation.gif)

<div class="text-center">
サブミット時にエラーメッセージが表示されます。
</div>

<!--
  これだけで、サブミット時に設定したバリデーションエラーが表示されます。
-->

---

## 入力時にエラーメッセージを表示する

<div class="my-12">
```tsx {2}
const [form, { username }] = useForm({
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

<!--
  入力直後にエラーメッセージを表示するには、`shouldValidate`を`onInput`に設定します。
-->

---

## 結果

![onInputValidation](../using-conform-in-remix/imgs/onInputValidation.gif)

<div class="text-center">
入力時にエラーメッセージが表示されます。
</div>

<!--
  すると、キーボード入力時にエラーメッセージが表示されます。
-->

---

## なぜフロントで検証を行うのか？

<div class="my-3">
ユーザーエクスペリエンスを向上させるために。<br/>

1クリック、タップでも少なく、ユーザーが目的を達成させるためにバリデーションしたいと考えています。
</div>

<div class="my-3">
であれば、エラーメッセージが表示されているときは、Submitボタンを無効にするのが望ましいと考えます。
</div>

<!--
  （直近でも燃えていましたが）

  なぜ我々はフロントエンドでバリデーションするのか？と問われれば、

  「User Experience向上のため」と答えるでしょう。

  1クリック、タップでも少なく、ユーザーが目的を達成させるためにバリデーションしたいと考えています。

  であれば、エラーメッセージが表示されているときは、Submitボタンを無効にするのが望ましいと考えます。
-->

---

## 検証失敗時にSubmitボタンを無効にする

<div class="text-094 my-2">

```tsx{10}
<Form
  {...getFormProps(form)}
>
  <label>username</label>
  <Input
    {...getInputProps(username, { type: "text" })}
  />
  {username.errors?.map((e) => (<div key={e}>{e}</div>))}
  <button
    disabled={!form.valid || !form.dirty || state === "submitting"}
  >
    {state !== "submitting" ? "Join" : "Sending..."}
  </button>
</Form>
```
</div>

<!--
  検証失敗時にサブミットボタンを無効にするには、`disabled`プロパティに`!form.valid || !form.dirty`を設定します。
-->

---

## 結果

![submitDisabledOnInvalidForm](../using-conform-in-remix/imgs/submitDisabledOnInvalidForm.gif)

<div class="text-center">
検証に失敗したときにサブミットボタンが無効になります。
</div>

<!--
  すると、フォームが無効なときにサブミットボタンが無効になります。
-->

---

## 感想

formのプロパティに関するドキュメントが見当たらず、実装が大変でした 😢



<!--
  formのプロパティに関するドキュメントが見当たらず、実装が大変でした。
-->

---

## なのでPRを作成しました

<div class="w-144 mx-auto my-4">

![pr](../using-conform-in-remix/imgs/conform-pr-887.png)

</div>

<!--
  そこで、ドキュメントを追加するためのPRを作成しました。

  Edmund, please check this.
-->

---

## 非同期検証 (with Valibot)

### Client

<div class="my-4">
```typescript {|6-7}
const createClientSchema = pipe(
  baseSchema,
  forward(
    partialCheck(
      [["username"]],
      () => false, // always false
      conformValibotMessage.VALIDATION_UNDEFINED,
    ),
    ["username"],
  ),
);
```
</div>

<!--
  Conformには面白い機能があります。

  クライアント側のバリデーションメッセージとして`VALIDATION_UNDEFINED`を設定することにより、サーバー側でのバリデーションを行うことができます。
-->

---

## 非同期検証 (with Valibot)

### Server

<div class="text-094">

```typescript {|6-9}
const createServerSchema = pipeAsync(
  baseSchema,
  forwardAsync(
    partialCheckAsync(
      [["username"]],
      async ({username}) => {
        return await checkUserName(username);
      },
      "This username is already in use.",
    ),
    ["username"],
  ),
);
```
</div>

<!--
  たとえば、ユーザー名の重複チェックなど、サーバー側でしかできないバリデーションを行うことができます。
-->

---

## 結果

![asyncValidation](../using-conform-in-remix/imgs/asyncValidation.gif)

<div class="text-center">
ユーザー名がサーバーで非同期にチェックされます。
</div>

<!--
  すると、入力時にサーバー側へバリデーションのためのリクエストが行われ、ユーザー名が非同期にチェックされます。
-->

---

## どのように動くのか？

フォームが変更されたとき、フロントエンドは`__intent__`プロパティとともにバックエンドにリクエストを送信します。

フォームに`__intent__`プロパティが含まれているとき、Conformは検証結果のみを返します。

このリクエストによってRemixのactionが呼び出され、`navigation.state`が`submitting`に設定されます。

<!--
  これがどのように動くのか軽く説明します。

  フォームが変更されたとき、フロントエンドは`__intent__`プロパティとともにバックエンドにリクエストを送信します。

  フォームに`__intent__`プロパティが含まれているとき、Conformは検証結果のみを返します。

  このリクエストによってRemixのactionが呼び出され、`navigation.state`が`submitting`に設定されます。
-->

---

## メリデメ

### pros

サーバー側でユーザーの検証を簡単に行うことができる 😊

### cons

navigation.stateが"submitting"になってしまうため、validate時に`Sending...`と表示されてしまう 😢

formのプロパティに`validating`があれば、`submitting`との区別がつくのではないか？と考えているのですが、どうでしょうか？

<!--
  サーバー側でユーザーの検証を簡単に行うことができるのがメリットです。

  しかし、navigation.stateが"submitting"になってしまうため、validate時に`Sending...`と表示されてしまいます 😢

  formのプロパティに`validating`があれば、`submitting`との区別がつくのではないか？と考えているのですが、どうでしょうか？
-->

---

## まとめ

Conformは、クライアントの入力をサーバーで非同期に検証することができる強力なライブラリです。

クライアントの入力をサーバーで非同期に検証することが簡単にできて衝撃的です。ぜひ試してみてください。

<!--
  Conformは、クライアントの入力をサーバーで非同期に検証することができる強力なライブラリです。

  クライアントの入力をサーバーで非同期に検証することが簡単にできて衝撃的です。ぜひ試してみてください。
-->

---

## おしまい

Conformの`defaultValue`について話したかったのですが、時間切れのようです 😢

懇親会で話しましょう！

- Twitter: [@const_myself](https://twitter.com/const_myself)
- GitHub: [ogadra](https://github.com/ogadra)

<PoweredBySlidev mt-10 />

<!--
  Conformの`defaultValue`について話したかったのですが、時間切れのようです 😢

  懇親会で話しましょう！
-->
