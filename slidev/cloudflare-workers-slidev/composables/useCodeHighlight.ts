import { ref } from 'vue';
import { codeToHtml } from 'shiki';
import { ansiToHtml } from '../utils/ansiToHtml';

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

  const updateResultHighlight = (output: string) => {
    highlightedResultHtml.value = ansiToHtml(output);
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
