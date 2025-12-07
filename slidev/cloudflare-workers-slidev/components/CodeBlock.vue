<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { codeToHtml } from 'shiki';
import { executeCode, type ExecutionResult } from '../composables/useCodeExecution';

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  lang: {
    type: String,
    default: 'typescript',
  },
  theme: {
    type: String,
    default: 'vitesse-dark',
  },
  editable: {
    type: Boolean,
    default: true,
  },
  filename: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:code']);

const highlightedHtml = ref('');
const isEditing = ref(false);
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const executionResult = ref<ExecutionResult | null>({
  output: "changed 6 packages in 3s",
  exitCode: 0,
  success: true,
});
const highlightedResultHtml = ref('');
const isExecuting = ref(false);

const updateResultHighlight = async (output: string) => {
  try {
    highlightedResultHtml.value = await codeToHtml(output, {
      lang: 'bash',
      theme: props.theme,
    });
  } catch {
    highlightedResultHtml.value = `<pre><code>${output}</code></pre>`;
  }
};

const getCodeFromHtml = () => {
  const codeContent = document.createElement('div');
  codeContent.innerHTML = highlightedHtml.value;
  return codeContent.textContent || '';
};

const lineCount = computed(() => {
  return (highlightedHtml.value.match(/<span class="line"/g) || []).length || 1;
});

const updateHighlight = (code: string) => {
  codeToHtml(code, {
    lang: props.lang,
    theme: props.theme,
  })
    .then((html) => {
      highlightedHtml.value = html;
    })
    .catch(() => {
      highlightedHtml.value = `<pre><code>${code}</code></pre>`;
    });
};

watch(
  () => props.code,
  (newCode) => {
    updateHighlight(newCode);
  },
);

watch(
  isEditing,
  (newValue, oldValue) => {
    if (oldValue && !newValue && textareaRef.value) {
      const code = textareaRef.value.value;
      updateHighlight(code);
      emit('update:code', code);
    }
  },
);

// Initial highlight
updateHighlight(props.code);

// Mock result highlight (for development)
if (executionResult.value?.output) {
  updateResultHighlight(executionResult.value.output);
}

const startEditing = () => {
  if (!props.editable) return;
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

const getCurrentCode = () => {
  if (textareaRef.value) {
    return textareaRef.value.value;
  }
  return getCodeFromHtml();
};

const handleExecute = async () => {
  isExecuting.value = true;
  executionResult.value = null;
  highlightedResultHtml.value = '';
  const result = await executeCode(getCurrentCode(), props.lang);
  executionResult.value = result;
  if (result?.output) {
    await updateResultHighlight(result.output);
  }
  isExecuting.value = false;
};
</script>

<template>
  <div class="code-block-wrapper">
    <div class="code-block" @click="startEditing">
      <span class="lang">{{ props.lang }}</span>
      <div class="line-numbers">
        <span v-for="n in lineCount" :key="n">{{ n }}</span>
      </div>
      <div class="code-content">
        <div
          v-if="!isEditing"
          class="highlighted-code"
          v-html="highlightedHtml"
        />
        <pre v-else class="edit-pre shiki shiki-themes vitesse-dark vitesse-light slidev-code"><code class="edit-code"><textarea
          ref="textareaRef"
          @blur="stopEditing"
          @keydown.escape="textareaRef?.blur()"
          class="code-textarea"
          :spellcheck="false"
        >{{ props.code }}</textarea></code></pre>
      </div>
      <button class="execute-btn" @click.stop="handleExecute" :disabled="isExecuting">
        {{ isExecuting ? '実行中...' : '▶ 実行' }}
      </button>
    </div>
    <div v-if="executionResult" class="execution-result" :class="{ success: executionResult.success, error: !executionResult.success }">
      <div class="result-header">
        <span class="result-status">{{ executionResult.success ? '✓' : '✗' }} Exit: {{ executionResult.exitCode }}</span>
      </div>
      <div v-if="highlightedResultHtml" class="result-output" v-html="highlightedResultHtml" />
      <pre v-else class="result-output">{{ executionResult.output || executionResult.error }}</pre>
    </div>
  </div>
</template>

<style scoped>
.code-block-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #1e1e1e;
}

.lang {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  background: #333;
  color: #ccc;
  font-size: 14px;
}

.execute-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 6px 16px;
  background: #4a9eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  opacity: 0.9;
  transition: opacity 0.2s, background 0.2s;
}

.execute-btn:hover {
  background: #3a8eef;
  opacity: 1;
}

.execute-btn:disabled {
  background: #666;
  cursor: not-allowed;
}

.code-block {
  position: relative;
  display: flex;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  background: #252525;
  color: #858585;
  text-align: right;
  user-select: none;
  border-right: 1px solid #333;
}

.line-numbers span {
  height: 30px;
  line-height: 30px;
}


.code-content {
  flex: 1;
  position: relative;
  min-width: 0;
}

.highlighted-code {
  padding: 16px;
  cursor: text;
}

.highlighted-code :deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent !important;
  overflow: visible;
}

.highlighted-code :deep(code) {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.edit-pre {
  margin: 0;
  padding: 16px !important;
  background: transparent !important;
}

.edit-code {
  display: block;
}

.code-textarea {
  display: block;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  background: transparent;
  color: #d4d4d4;
  resize: none;
  overflow: hidden;
  font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
  font-size: 1em;
  line-height: 1.5;
  field-sizing: content;
}

.execution-result {
  margin-top: 32px;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a1a;
  border: 1px solid #333;
}

.execution-result.success {
  border-color: #4a9;
}

.execution-result.error {
  border-color: #e55;
}

.result-header {
  padding: 8px 16px;
  background: #252525;
  border-bottom: 1px solid #333;
}

.result-status {
  font-size: 16px;
  color: #ccc;
}

.execution-result.success .result-status {
  color: #4a9;
}

.execution-result.error .result-status {
  color: #e55;
}

.result-output {
  margin: 0;
  padding: 16px;
  font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #d4d4d4;
  white-space: pre-wrap;
  word-break: break-all;
}

div :deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  overflow: visible;
}

</style>
