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

type ExecuteContent = {
  lang: 'bash',
  code: string,
} | {
  lang: 'TypeScript',
  code: string,
  fileName: string,
}

export const executeCode = async (
  postContent: ExecuteContent,
  onChunk?: (chunk: string) => void
): Promise<ExecutionResult | null> => {
  const slide = getSlideNameFromUrl();
  if (!slide) return null;

  const response = await fetch(`/sandbox/${slide}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postContent),
  });

  const contentType = response.headers.get('content-type') || '';

  // Handle EventStream response
  if (contentType.includes('text/event-stream')) {
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
        if (line.startsWith('data: ')) {
          const data = line.slice(6);

          try {
            const parsed = JSON.parse(data);
            switch (parsed.type) {
              case 'stdout':
              case 'stderr':
                if (parsed.data && parsed.data !== '\n') {
                  output += parsed.data;
                  onChunk?.(parsed.data);
                }
                break;
              case 'complete':
                exitCode = parsed.exitCode ?? 0;
                break;
              case 'error':
                error = parsed.error || parsed.data || 'Unknown error';
                break;
            }
          } catch {
            // Not JSON, skip
          }
        }
      }
    }

    return {
      output,
      exitCode,
      success: exitCode === 0 && !error,
      error: error || undefined,
    };
  }

  // Handle JSON response (for TypeScript save, etc.)
  return response.json();
};
