export const ExecutionStatus = {
  idle: 'idle',
  executing: 'executing',
  interrupted: 'interrupted',
  completed: 'completed',
} as const;

export type ExecutionStatus = (typeof ExecutionStatus)[keyof typeof ExecutionStatus];

export interface ExecutionResult {
  output: string;
  exitCode: number;
  success: boolean;
  error?: string;
};

const getSlideNameFromUrl = () => {
  const path = window.location.pathname;
  const match = path.match(/^\/([^/]+)/);
  return match ? match[1] : '';
};

interface TypeScriptContent {
  code: string;
  fileName: string;
};

interface BashCallbacks {
  onChunk: (chunk: string) => void;
  onProcessId: (id: string) => void;
};

export const executeBash = async (
  code: string,
  callbacks: BashCallbacks
): Promise<ExecutionResult | null> => {
  const slide = getSlideNameFromUrl();
  if (!slide) return null;

  // 1. POSTでコマンド実行、processIdを取得
  const response = await fetch(`/sandbox/${slide}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, execType: 'bash' }),
  });

  const { processId } = await response.json();
  if (!processId) return null;

  callbacks.onProcessId(processId);

  // 2. EventSourceでストリーム接続
  return new Promise((resolve) => {
    const eventSource = new EventSource(`/sandbox/${slide}/stream?processId=${processId}`);
    let output = '';
    let exitCode = 0;
    let error = '';

    eventSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      switch (parsed.type) {
        case 'start':
        case 'process_info':
          break;
        case 'stdout':
        case 'stderr':
          if (parsed.data && parsed.data !== '\n') {
            output += parsed.data;
            callbacks.onChunk(parsed.data);
          }
          break;
        case 'complete':
        case 'exit':
          exitCode = parsed.exitCode ?? 0;
          eventSource.close();
          resolve({ output, exitCode, success: exitCode === 0 && !error, error: error || undefined });
          break;
        case 'error':
          error = parsed.error || parsed.data || 'Unknown error';
          break;
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      resolve({ output, exitCode, success: false, error: error || 'Connection error' });
    };
  });
};

export const saveTypeScript = async (
  content: TypeScriptContent
): Promise<ExecutionResult | null> => {
  const slide = getSlideNameFromUrl();
  if (!slide) return null;

  const response = await fetch(`/sandbox/${slide}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      execType: 'TypeScript',
      ...content,
    }),
  });

  return response.json();
};

export const killProcess = async (processId: string): Promise<void> => {
  const slide = getSlideNameFromUrl();
  if (!slide) return;

  await fetch(`/sandbox/${slide}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ execType: 'kill', code: '', processId }),
  });
};

export interface StartSandboxResult {
  url: string;
  exitCode: number;
  success: boolean;
}

export const startSandbox = async (): Promise<StartSandboxResult | null> => {
  const slide = getSlideNameFromUrl();
  if (!slide) return null;

  try {
    const response = await fetch(`/sandbox/${slide}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ execType: 'start' }),
    });

    if (!response.ok) {
      console.error('startSandbox failed:', response.status, response.statusText);
      return null;
    }

    const text = await response.text();
    if (!text) {
      console.error('startSandbox: empty response');
      return null;
    }

    return JSON.parse(text);
  } catch (error) {
    console.error('startSandbox error:', error);
    return null;
  }
};
