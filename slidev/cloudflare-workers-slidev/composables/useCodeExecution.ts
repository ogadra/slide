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
  postContent: ExecuteContent
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

  return response.json();
};
