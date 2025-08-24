import { useState } from "hono/jsx";
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
            <header>
                <h1>iOS Safari Demo Chat</h1>
            </header>
            
            <main>
                <section>
                {messages.map((msg, index) => (
                    <article key={index}>
                        <p>{msg}</p>
                    </article>
                ))}
                </section>
                
                <footer>
                    <form onSubmit={sendMessage}>
                        <div>
                            <input 
                                type="text"
                                placeholder="メッセージを入力..."
                                maxlength={100}
                            />
                        </div>
                        <button type="submit">
                            <span>送信</span>
                        </button>
                    </form>
                </footer>
            </main>
        </>
    )
};

const rootDom = document.getElementById("root")!;
render(<App />, rootDom);
