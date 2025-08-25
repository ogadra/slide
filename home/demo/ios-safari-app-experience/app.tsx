import { useState, useEffect } from "hono/jsx"
import { css } from "hono/css";
import { render } from "hono/jsx/dom";

// Pattern0: position: absolute; + height calc with visualViewport API + meta viewport tag
// Pattern1: position: fixed;
// Pattern2: position: absolute; + height calc with calc(100vh - footerHeight - headerHeight);
// Pattern3: position: absolute; + height calc with visualViewport API

const Patterns = {
    Pattern0: '完成版',
    Pattern1: 'パターン1',
    Pattern2: 'パターン2',
    Pattern3: 'パターン3',
} as const;

type Pattern = typeof Patterns[keyof typeof Patterns];

const App = () =>  <Body />;

const Body = () => {
    const [pattern, setPattern] = useState<Pattern>(Patterns.Pattern1);
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
        ..."でも週間DL数16万超えてるという現実",
        "JavaScriptエコシステムの闇を見た気分"
    ]);

    const heightAttribute = (pattern: Pattern) => {
        switch (pattern) {
            case Patterns.Pattern0:
            case Patterns.Pattern3:
                return { height: `${height}px` };
            case Patterns.Pattern2:
                return { height: `calc(100dvh - ${footerHeight}px - ${headerHeight}px)` };
            case Patterns.Pattern1:
            default:
                return {};
        }
    }

    const sendMessage = (e: Event) => {
        e.preventDefault();
        const input = (e.currentTarget as HTMLFormElement).querySelector('input');
        const msg = input?.value.trim();
        if (msg) {
            setMessages([...messages, msg]);
            if (input) input.value = '';
        }
    };

    const appendMetaViewport = (propsPattern: Pattern) => {
        const metaViewport = document.createElement("meta");
        metaViewport.name = "viewport";

        switch (propsPattern) {
            case Patterns.Pattern0:
                metaViewport.content = "width=device-width, initial-scale=1.0, interactive-widget=resizes-content";
                break;
            default:
                metaViewport.content = "width=device-width, initial-scale=1.0";
        }
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

    const reSizeHeight = () => {
        const afterHeight = calcHeight();

        setHeight(afterHeight);

        window.scrollTo(0, 0);
    };

    // 初期化処理
    useEffect(() => {
        // 画面からフッターの距離を調整
        reSizeHeight();
        window.visualViewport?.addEventListener("resize", reSizeHeight);

        // meta viewportを追加
        appendMetaViewport(pattern);

        return () => {
            window.visualViewport?.removeEventListener("resize", reSizeHeight);
            removeMetaViewport();
        };
    }, [reSizeHeight, removeMetaViewport]);

    const onChangePattern = (e: Event) => {
        const select = e.currentTarget as HTMLSelectElement;
        const selectedPattern = select.value as Pattern;
        setPattern(selectedPattern);
    }

    // パターン変更時の処理
    useEffect(() => {
        removeMetaViewport();
        appendMetaViewport(pattern);
        return () => {
            removeMetaViewport();
        }
    }, [pattern]);

    return (
        <div class={htmlClass}>
            <header class={headerClass}>
                <h1 class={headerTitleClass}>{pattern}を表示中</h1>
                <form class={radioFormClass}>
                    <div class={radioGroupClass}>
                        {Object.values(Patterns).map((p) => (
                            <div key={p} class={radioItemClass} onClick={() => setPattern(p)}>
                                <input
                                    type="radio"
                                    id={`pattern${p}`}
                                    name="pattern"
                                    value={p}
                                    checked={pattern === p}
                                    onChange={onChangePattern}
                                />
                                {p}
                            </div>
                        ))}
                    </div>
                </form>
            </header>

            <main class={mainClass(pattern)} style={heightAttribute(pattern)}>

                <section class={sectionClass}>
                {messages.map((msg, index) => (
                    <article key={index} class={articleClass}>
                        <p class={articlePClass}>{msg}</p>
                    </article>
                ))}
                </section>
            </main>

            <div
                class={footerClass(pattern)}
                ref={setFooterRef}
            >
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

const headerHeight = 96;
const footerHeight = 68;

const htmlClass = css`
    /*overflow: hidden;*/
`

const headerClass = css`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    color: white;
    height: ${headerHeight}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 16px 0px;
    gap: 8px;

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

const mainClass = (pattern: Pattern) => css`
    flex: 1;
    /*display: flex;*/
    flex-direction: column;
    /*overflow: hidden;*/
    padding: 96px 0 0 0;
    transition: height 0.25s cubic-bezier(0,1,0,1);

    ${pattern === Patterns.Pattern1 ? `
        /*min-height: 0;*/
    ` : `
        position: relative;
    `}
`;

const sectionClass = css`
    flex: 1;
    /*overflow-y: auto;*/
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

const footerClass = (pattern: Pattern) => css`
    font-size: 16px;
    height: ${footerHeight}px;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    padding: 10px 20px;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
    
    ${pattern === Patterns.Pattern1 ? `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
    ` : `
        position: absolute;
    `}
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

const radioFormClass = css`
    margin: 0 0 16px;
    width: 100%;
`

const radioGroupClass = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
`

const radioItemClass = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
    flex: 1;
    min-width: fit-content;
    border: 1px solid rgba(100, 181, 246, 0.5);
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 11px;
    font-weight: 500;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    text-select: none;
    
    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(100, 181, 246, 0.8);
    }
    
    &:has(input[type="radio"]:checked) {
        background: rgba(0, 0, 0, 0.3);
        border-color: rgba(100, 181, 246, 1);
        color: white;
        font-weight: 600;
    }
    
    input[type="radio"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
        cursor: pointer;
    }
`

const rootDom = document.getElementById("root")!;
render(<App />, rootDom);
