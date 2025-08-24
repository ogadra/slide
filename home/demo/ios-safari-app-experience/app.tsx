import { useState, useEffect } from "hono/jsx"
import { css } from "hono/css";
import { render } from "hono/jsx/dom";


const App = () => (
    <>
        <Body />
    </>
);



const Body = () => {
    const [footerRef, setFooterRef] = useState<HTMLDivElement | null>(null);

    const calcHeight = () => {
        if (typeof window === 'undefined') return 0;
		if (!window.visualViewport) {
			return 0;
		}
		if (!footerRef) {
			return Math.floor(window.visualViewport.height);
		}

        return Math.floor(window.visualViewport.height) - Math.ceil(footerRef.clientHeight) - 1;
    }

    const firstHeight = calcHeight();
    const [height, setHeight] = useState<number>(firstHeight);
    const [messages, setMessages] = useState<string[]>([
        "is-evenっていうnpmパッケージ見つけた 😂",
        "数値が偶数かどうか判定するだけのライブラリ",
        "しかもis-oddに依存してる",
        "is-oddはis-numberに依存してて...",
        "たった一行で書ける処理に2つのパッケージに依存してる 🤯",
        "でも週間DL数16万超えてるという現実",
        "JavaScriptエコシステムの闇を見た気分"
    ]);

    const sendMessage = (e: Event) => {
        e.preventDefault();
        const input = (e.currentTarget as HTMLFormElement).querySelector('input');
        const msg = input?.value.trim();
        if (msg) {
            setMessages([...messages, msg]);
            if (input) input.value = '';
        }
    };

    const appendMetaViewport = () => {
        const metaViewport = document.createElement("meta");
        metaViewport.name = "viewport";
        metaViewport.content = "width=device-width, initial-scale=1.0, interactive-widget=resizes-content";
        document.getElementsByTagName("head")[0].appendChild(metaViewport);
    }

    const removeMetaViewport = () => {
        const metaTags = document.getElementsByTagName("meta");
        for (let i = metaTags.length - 1; i >= 0; i--) {
            const meta = metaTags[i];
            if (meta.name === "viewport") {
                document.getElementsByTagName("head")[0].removeChild(meta);
            }
        }
    }

    useEffect(() => {
		// 画面からフッターの距離を調整
		reSizeHeight();
		window.visualViewport?.addEventListener("resize", reSizeHeight);

        // meta viewportを追加
        appendMetaViewport();

		return () => {
			window.visualViewport?.removeEventListener("resize", reSizeHeight);
            removeMetaViewport();
		};
	});

    const reSizeHeight = () => {
        const afterHeight = calcHeight();

		setHeight(afterHeight);

        window.scrollTo(0, 0);
	};

    return (
        <div class={htmlClass}>
            <header class={headerClass}>
                <h1 class={headerTitleClass}>Height: {height}px</h1>
            </header>
            
            <main class={mainClass} style={{ height: `${height}px` }}>
                <section class={sectionClass}>
                {messages.map((msg, index) => (
                    <article key={index} class={articleClass}>
                        <p class={articlePClass}>{msg}</p>
                    </article>
                ))}
                </section>
            </main>

            <div class={footerClass} ref={setFooterRef}>
                <form class={footerFormClass} onSubmit={sendMessage}>
                    <div class={footerInputWrapperClass}>
                        <input 
                            class={footerInputClass}
                            type="text"
                            placeholder="メッセージを入力..."
                            maxlength={100}
                        />
                    </div>
                    <button class={footerButtonClass} type="submit">
                        <span>送信</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

const htmlClass = css`
    overflow: hidden;
`

const headerClass = css`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    color: white;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
`

const headerTitleClass = css`
    font-size: 17px;
    font-weight: 600;
    margin: auto;
`

const mainClass = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    padding: 50px 0 0 0;
    transition: height 0.25s cubic-bezier(0,1,0,1);
`

const sectionClass = css`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 100%;
    -webkit-overflow-scrolling: touch;
`

const articleClass = css`
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 24px;
    background: #007AFF;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
`

const articlePClass = css`
    margin: 0;
    font-size: 16px;
    line-height: 1.4;
    word-wrap: break-word;
`

const footerClass = css`
    font-size: 16px;
    position: absolute;
    height: 68px;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    padding: 10px 20px;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
`

const footerFormClass = css`
    display: flex;
    align-items: flex-end;
    gap: 12px;
    width: 100%;
`

const footerInputWrapperClass = css`
    flex: 1;
    position: relative;
`

const footerInputClass = css`
    width: 100%;
    height: 48px;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 0 20px;
    font-family: inherit;
    color: #2c3e50;
    transition: all 0.3s ease;
    outline: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    font-size: inherit;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
    
    &:focus {
        background: white;
        border-color: #667eea;
    }
    
    &::placeholder {
        color: #95a5a6;
    }
`

const footerButtonClass = css`
    height: 48px;
    padding: 0 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
    font-size: inherit;
    
    &:hover {
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
        border-color: rgba(255, 255, 255, 0.5);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
    
    span {
        font-weight: bold;
    }
`;

const rootDom = document.getElementById("root")!;
render(<App />, rootDom);
