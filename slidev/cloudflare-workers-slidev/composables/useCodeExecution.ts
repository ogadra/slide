export const ExecutionStatus = {
  idle: 'idle',
  executing: 'executing',
  interrupted: 'interrupted',
  completed: 'completed',
} as const;

export type ExecutionStatus = (typeof ExecutionStatus)[keyof typeof ExecutionStatus];

export type ExecutionResult = {
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

type BashContent = {
  lang: 'bash';
  code: string;
};

type TypeScriptContent = {
  lang: 'TypeScript';
  code: string;
  fileName: string;
};

type BashCallbacks = {
  onChunk: (chunk: string) => void;
  onProcessId: (id: string) => void;
};

export const executeBash = async (
  content: BashContent,
  callbacks: BashCallbacks
): Promise<ExecutionResult | null> => {
  const slide = getSlideNameFromUrl();
  if (!slide) return null;

  const response = await fetch(`/sandbox/${slide}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });

  const processId = response.headers.get('Process-Id');
  if (processId) {
    callbacks.onProcessId(processId);
  }

  const reader = response.body?.getReader();
  if (!reader) return null;

  const decoder = new TextDecoder();
  let output = '';
  let exitCode = 0;
  let error = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const text = decoder.decode(value, { stream: true });
    const lines = text.split('\n');

    for (const line of lines) {
      if (!line) continue;
      const data = line.replace(/^data: /, '');
      const parsed = JSON.parse(data);
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
          break;
        case 'error':
          error = parsed.error || parsed.data || 'Unknown error';
          break;
      }
    }
  }

  return {
    output,
    exitCode,
    success: exitCode === 0 && !error,
    error: error || undefined,
  };
};

export const saveTypeScript = async (
  content: TypeScriptContent
): Promise<ExecutionResult | null> => {
  const slide = getSlideNameFromUrl();
  if (!slide) return null;

  const response = await fetch(`/sandbox/${slide}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });

  return response.json();
};

export const killProcess = async (processId: string): Promise<void> => {
  const slide = getSlideNameFromUrl();
  if (!slide) return;

  await fetch(`/sandbox/${slide}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lang: 'kill', code: '', processId }),
  });
};
