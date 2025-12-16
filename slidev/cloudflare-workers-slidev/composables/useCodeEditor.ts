import { ref, computed, type Ref } from 'vue';

export const useCodeEditor = (highlightedHtml: Ref<string>) => {
  const isEditing = ref(false);
  const textareaRef = ref<HTMLTextAreaElement | null>(null);

  const lineCount = computed(() => {
    return (highlightedHtml.value.match(/<span class="line"/g) || []).length || 1;
  });

  const textareaHeight = computed(() => {
    return `${lineCount.value * 20}px`;
  });

  const getCodeFromHtml = () => {
    const codeContent = document.createElement('div');
    codeContent.innerHTML = highlightedHtml.value;
    return codeContent.textContent || '';
  };

  const getCurrentCode = () => {
    if (textareaRef.value) {
      return textareaRef.value.value;
    }
    return getCodeFromHtml();
  };

  const startEditing = (editable: boolean) => {
    if (!editable) return;
    isEditing.value = true;
    const codeContent = getCodeFromHtml();
    setTimeout(() => {
      if (textareaRef.value) {
        textareaRef.value.focus();
        textareaRef.value.value = codeContent;
      }
    }, 0);
  };

  const stopEditing = () => {
    isEditing.value = false;
  };

  return {
    isEditing,
    textareaRef,
    lineCount,
    textareaHeight,
    getCodeFromHtml,
    getCurrentCode,
    startEditing,
    stopEditing,
  };
};
