import { ref } from 'vue';
import { codeToHtml } from 'shiki';

export const useCodeHighlight = (theme: string) => {
  const highlightedHtml = ref('');
  const highlightedResultHtml = ref('');

  const updateHighlight = async (code: string, lang: string) => {
    try {
      highlightedHtml.value = await codeToHtml(code, {
        lang: lang.toLowerCase(),
        theme,
      });
    } catch {
      highlightedHtml.value = `<pre><code>${code}</code></pre>`;
    }
  };

  const updateResultHighlight = async (output: string) => {
    try {
      highlightedResultHtml.value = await codeToHtml(output, {
        execType: 'bash',
        theme,
      });
    } catch {
      highlightedResultHtml.value = `<pre><code>${output}</code></pre>`;
    }
  };

  const resetResultHighlight = () => {
    highlightedResultHtml.value = '';
  };

  return {
    highlightedHtml,
    highlightedResultHtml,
    updateHighlight,
    updateResultHighlight,
    resetResultHighlight,
  };
};
