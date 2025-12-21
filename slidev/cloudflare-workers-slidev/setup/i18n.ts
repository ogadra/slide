import { createI18n } from "vue-i18n";

export const SUPPORTED_LOCALES = ["ja", "en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const messages = {
	ja: {
		title: {
			main: "実行可能なスライドを作る",
			withBreak: "実行可能な\nスライドを作る",
		},
		slide2: {
			title: "我々はなぜ登壇するのか",
			body1: "知見・経験を共有したいから",
		},
		slide3: {
			title: "知見の共有「だけ」で満足？",
			body1: "聞いて終わる話は「忘れられる」\n=> 実際に「手を動かして」もらいたい",
		},
		slide4: {
			title: "そんなこと、できるの？",
			body1: "PCを持参 -> 環境構築？",
			body2: "LTは5分しかない",
		},
		slide5: {
			title: "だから「実行可能な」スライドを作る",
			body1: "登壇中に全員が「試せる」環境を\nスライドに「埋め込む」",
		},
		slide6: {
			body1: "デモLT",
		},
		slide7: {
			title: "5分後。\nあなたはHono CLI経験者",
		},
		slide8: {
			title: "Hono CLI触ったことのある方、挙手！",
			body1: "今日は全員の挙手を目標とします",
		},
		slide9: {
			title: "Hono CLIとは",
			alt: "Hono CLI 爆誕というzennのサイトのスクリーンショット",
		},
		slide10: {
			title: "Hono CLIとは",
			body1: "",
			human: "人間",
			and: "と",
			ai: "AI",
			body2: "のためのCLI",
			humanTask1: "動作確認する",
			humanTask2: "最適化する",
			aiTask1: "ドキュメントを読む",
			aiTask2: "動作確認する",
		},
		slide11: {
			title: "hono/cliのインストール",
			body1: "npmでインストールできます！",
		},
		slide12: {
			body1: "ソースコード",
			body2: "実行コマンド",
		},
		slide13: {
			body1: "ソースコード",
			body2: "実行コマンド",
			body3: "実行を強制終了するコマンド",
		},
		slide14: {
			title: "Hono CLI触ったことのある方、挙手！",
			body1: "ね、簡単でしょ？",
		},
		slide16: {
			title: "というわけで",
			body1: "",
			highlight: "「実行可能なスライド」",
			body2: "を作ってきました",
			note: "現在動いているコマンドはモックです",
		},
		slide17: {
			title: "技術スタック",
			cfDesc: "ルーティング",
			doDesc: "スライド同期\nコンテナ保存",
			sandboxDesc: "コンテナでの\nコマンド実行",
			note: "現在はモックのため、Sandbox SDKを使用していません",
		},
		slide18: {
			title: "Sandbox SDKとは",
			body1: "Cloudflare上のSandbox環境",
			body2: "Dockerコンテナ内で",
			body3: "任意コマンド",
			body4: "を実行できる",
		},
		slide19: {
			title: "例",
			body1: "DockerにあるPythonのバージョンを確認する",
			body2: "任意コードを1行で実行できる",
		},
		slide20: {
			title: "今回のデモだとこんな感じ",
			body1: "ランダムID毎にコンテナを立ち上げる",
		},
		slide21: {
			title: "これによって",
			body1: "アクセスしたユーザーごとにコンテナが立ち上がる！",
		},
		slide22: {
			title: "今回のデモだとこんな感じ",
			body1: "GetリクエストでStream返却",
		},
		slide23: {
			title: "苦労したこと",
			body1: "workersのカスタムドメイン",
			body2: "に対して\n",
			body3: "のRoute設定が必要",
			card1Title: "カスタムドメインが必要",
			card1Desc: "*.workers.devのサブドメイン不可",
			card2Title: "サブドメインでやる場合",
			card2Desc: "「Advanced Certificate Manager」\n月額10ドル",
		},
		codeBlock:{
			execute: "実行",
			stop: "停止",
		},
	},
	en: {
		title: {
			main: "Creating Executable Slides",
			withBreak: "Creating\nExecutable Slides",
		},
		slide2: {
			title: "Why Do We Present?",
			body1: "To share knowledge and experiences.",
		},
		slide3: {
			title: "Satisfied with just sharing knowledge?",
			body1: "Talks that end with listening are \"forgotten\".\nWant people to actually \"get hands-on\".",
		},
		slide4: {
			title: "Is that even possible?",
			body1: "Bring your PC -> Setup environment?",
			body2: "LT is only 5 minutes.",
		},
		slide5: {
			title: "So let's create \"executable\" slides.",
			body1: "\"Embed\" a \"try it\" environment\nthat everyone can use right in the slides while presenting.",
		},
		slide6: {
			body1: "Demo LT",
		},
		slide7: {
			title: "5 minutes later,\nYou are now a Hono CLI user.",
		},
		slide8: {
			title: "Raise your hand if you've used Hono CLI!",
			body1: "Today's goal is\nfor everyone to raise their hand.",
		},
		slide9: {
			title: "What is Hono CLI?",
			alt: "Screenshot of Zenn article about Hono CLI 爆誕",
		},
		slide10: {
			title: "What is Hono CLI?",
			body1: "CLI for ",
			human: "Humans",
			and: " and ",
			ai: "AI",
			body2: "",
			humanTask1: "Verify operation",
			humanTask2: "Optimize",
			aiTask1: "Read documentation",
			aiTask2: "Verify operation",
		},
		slide11: {
			title: "Installing hono/cli",
			body1: "You can install it with npm!",
		},
		slide12: {
			body1: "Source Code",
			body2: "Execute command",
		},
		slide13: {
			body1: "Source Code",
			body2: "Execute command",
			body3: "Force kill command",
		},
		slide14: {
			title: "Raise your hand if you've used Hono CLI!",
			body1: "See? It's easy, right?",
		},
		slide16: {
			title: "So",
			body1: "I've created ",
			highlight: "\"Executable Slides\"",
			body2: ".",
			note: "The running commands are currently mocked.",
		},
		slide17: {
			title: "Tech Stack",
			cfDesc: "Routing",
			doDesc: "Slide sync\nContainer storage",
			sandboxDesc: "Command execution\nin containers",
			note: "Currently mocked, so Sandbox SDK is not used.",
		},
		slide18: {
			title: "What is Sandbox SDK?",
			body1: "Sandbox environment on Cloudflare.",
			body2: "Execute ",
			body3: "any command",
			body4: " in Docker containers.",
		},
		slide19: {
			title: "Example",
			body1: "Check Python version in Docker.",
			body2: "Execute any code in one line.",
		},
		slide20: {
			title: "In this demo",
			body1: "Start a container per random ID.",
		},
		slide21: {
			title: "With this",
			body1: "A container is started for each user!",
		},
		slide22: {
			title: "In this demo",
			body1: "Return Stream with GET request.",
		},
		slide23: {
			title: "Struggles",
			body1: "For workers custom domain ",
			body2: ", \n",
			body3: " route settings required.",
			card1Title: "Custom domain required",
			card1Desc: "*.workers.dev subdomain not allowed.",
			card2Title: "If using subdomain",
			card2Desc: "\"Advanced Certificate Manager\"\n$10/month",
		},
		codeBlock: {
			execute: "execute",
			stop: "stop"
		}
	},
};

export const i18n = createI18n({
	legacy: false,
	locale: "ja",
	fallbackLocale: "ja",
	messages,
});

export const normalizeLocale = (
	value: string | null | undefined | unknown,
): SupportedLocale => {
	if (typeof value !== "string") return "ja";
	const lower = value.toLowerCase();
	if (lower.startsWith("en")) return "en";
	if (lower.startsWith("ja")) return "ja";
	return "ja";
};

export const setLocale = (locale: SupportedLocale): void => {
	i18n.global.locale.value = locale;
};

