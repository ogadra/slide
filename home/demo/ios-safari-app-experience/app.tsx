import { useState } from "hono/jsx"
import { css } from "hono/css";
import { render } from "hono/jsx/dom";


const App = () => (
    <>
        <Body />
    </>
);



const Body = () => {
    const [messages, setMessages] = useState<string[]>(["サンプルメッセージ"]);

    const sendMessage = (e: Event) => {
        e.preventDefault();
        const input = (e.currentTarget as HTMLFormElement).querySelector('input');
        const msg = input?.value.trim();
        if (msg) {
            setMessages([...messages, msg]);
            if (input) input.value = '';
        }
    };

    return (
        <>
            <header class={headerClass}>
                <h1 class={headerTitleClass}>iOS Safari Demo Chat</h1>
            </header>
            
            <main class={mainClass}>
                <section class={sectionClass}>
                {messages.map((msg, index) => (
                    <article key={index} class={articleClass}>
                        <p class={articlePClass}>{msg}</p>
                    </article>
                ))}
                </section>
                
                <footer class={footerClass}>
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
                </footer>
            </main>
        </>
    )
}

const headerClass = css`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  color: white;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
`

const headerTitleClass = css`
  font-size: 17px;
  font-weight: 600;
  margin: 0;
`

const mainClass = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

const sectionClass = css`
  flex: 1;
  overflow-y: auto;
  padding: 16px 16px 100px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  font-size: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding: 16px 20px;
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
