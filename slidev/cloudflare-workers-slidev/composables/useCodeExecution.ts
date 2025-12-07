const getSlideNameFromUrl = () => {
  const path = window.location.pathname;
  const match = path.match(/^\/([^/]+)/);
  return match ? match[1] : '';
};

export const executeCode = async (code: string) => {
  const slide = getSlideNameFromUrl();
  if (!slide) return;

  const response = await fetch(`/sandbox/${slide}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  console.log('Execute response:', await response.json());
};
