---
theme: default
title: '5分間でハンズオン? できらぁ!'
date: '2026/09/12'
event: 'サークル内発表'
info: '5分間でハンズオン? できらぁ!'
colorSchema: 'dark'
drawings:
  enabled: false
transition: none
defaults:
  transition: none
  layout: default
mdc: true
canvasWidth: 1920
fonts:
  sans: 'Zen Kaku Gothic New'
  mono: 'JetBrains Mono'
  weights: '400,500,700,900'
  provider: google
---

<TitleSlide
  :lines="['5分間でハンズオン?']"
  speaker="おがどら"
/>

---

<PunchSlide>できらぁ!</PunchSlide>

---

<StatementSlide>
みなさん
</StatementSlide>

---

<StatementSlide>
もちろん、<span class="accent">Nix</span>って<br/>
使ってますよね？
</StatementSlide>

---

<StatementSlide>
そもそも<br/>
<span class="accent">Nix</span>とはなにか
</StatementSlide>

---

<StatementSlide>
宣言的で再現可能な<br/>
信頼性のある<br/>
<span class="accent">パッケージマネージャ</span>
</StatementSlide>

---

<StatementSlide>
なんぞや
</StatementSlide>

---

<StatementSlide>
難しそう
</StatementSlide>

---

<AsideSlide>
（ここで長々とNixの説明をする）
</AsideSlide>

---

<StatementSlide>
なるほど
</StatementSlide>

---

<StatementSlide>
わかった
</StatementSlide>

---

<StatementSlide>
カッコ良さそうだから<br/>
触ってみたい
</StatementSlide>

---

<StatementSlide>
メモを残す
</StatementSlide>

---

<StatementSlide>
（飲酒）
</StatementSlide>

---

<StatementSlide>
帰宅
</StatementSlide>

---

<StatementSlide>
就寝
</StatementSlide>

---

<StatementSlide>
普通の発表なら<br/>
ここで終わりです
</StatementSlide>

---

<StatementSlide>
いやいや
</StatementSlide>

---

<StatementSlide>
せっかくだから<br/>
<span class="accent">触ってもらわないと</span>
</StatementSlide>

---

<StatementSlide>
そう、思うわけです
</StatementSlide>

---

<SectionOpener>
だから、今、ここで<br/>
みなさんにNixを<br/>
触ってほしい!
</SectionOpener>

---

<StepsSlide
  :steps="['環境を汚さずコマンドが実行できる', 'nix develop']"
/>

---

<SectionOpener>
環境を汚さずに<br/>
<span class="accent">コマンドが動く</span>
</SectionOpener>

---

<StatementSlide>
ポケモンに何か<br/>
言わせたいこと、<br/>
ありますよね
</StatementSlide>

---

<CommandSlide
  command="nix run nixpkgs#pokemonsay 'Nix'"
  note="実行ボタンを押してみてください"
/>

---

<StatementSlide>
ポケモンに<br/>
<span class="accent">ものを言わせられます</span>
</StatementSlide>

---

<CommandSlide
  command="which pokemonsay"
  output="pokemonsay not found"
  note="PATHは通っていません"
/>

---

<StatementSlide>
実行したのに<br/>
環境は<span class="accent">クリーンなまま</span>
</StatementSlide>

---

<StatementSlide>
複数パッケージを<br/>
同時に使いたいときは？
</StatementSlide>

---

<CommandSlide
  :command="['nix develop --command \\', '  sh -c &quot;figlet \'Nix\' | cowsay -n | lolcat -f&quot;']"
  note="3つのコマンドが揃った環境に入る"
  small
/>

---

<SectionOpener>
Nixを<span class="accent">叩ける環境</span>を<br/>
人数分、用意しました
</SectionOpener>

---

<StatementSlide>
1人1コンテナを割り当て<br/>
ブラウザ経由で<br/>
<span class="accent">コマンドを実行</span>した
</StatementSlide>

---

<StatementSlide>
布教したいから、<br/>
<span class="accent">触れる環境ごと</span><br/>
持ってきました
</StatementSlide>

---

<StatementSlide>

LT中に落ちたら<br/>
意味ないので、<br/>
このシステムは<br/>
<span class="accent">マルチクラウド</span>です

</StatementSlide>

---

<PunchSlide>Nixはいいぞ！</PunchSlide>

---

<StatementSlide>
ご清聴<br/>
ありがとうございました
</StatementSlide>

---

<ProfileSlide
  name="おがどら"
  avatar="https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif"
  :lines="['twitter.com/const_myself', 'github.com/ogadra', 'slide.ogadra.com']"
/>
