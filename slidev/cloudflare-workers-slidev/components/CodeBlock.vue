<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { executeBash, saveTypeScript, killProcess, ExecutionStatus, type ExecutionResult } from '../composables/useCodeExecution';
import { useCodeHighlight } from '../composables/useCodeHighlight';
import { useCodeEditor } from '../composables/useCodeEditor';

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  lang: {
    type: String,
    default: 'TypeScript',
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

// Composables
const {
  highlightedHtml,
  highlightedResultHtml,
  updateHighlight,
  updateResultHighlight,
  resetResultHighlight,
} = useCodeHighlight(props.theme);

const {
  isEditing,
  textareaRef,
  lineCount,
  textareaHeight,
  getCurrentCode,
  startEditing: startEditingBase,
  stopEditing,
} = useCodeEditor(highlightedHtml);

// Execution state
const executionResult = ref<ExecutionResult | null>(null);
const executionStatus = ref<ExecutionStatus>(ExecutionStatus.idle);
const currentProcessId = ref<string | null>(null);

// Computed for template simplification
const isExecuting = computed(() => executionStatus.value === ExecutionStatus.executing);

const resultStatusText = computed(() => {
  if (executionStatus.value === ExecutionStatus.executing) return '実行中...';
  if (executionStatus.value === ExecutionStatus.interrupted) return 'Interrupted';
  return `${executionResult.value?.success ? '✓' : '✗'} Exit: ${executionResult.value?.exitCode}`;
});

const resultClass = computed(() => ({
  streaming: executionStatus.value === ExecutionStatus.executing,
  success: executionStatus.value === ExecutionStatus.completed && executionResult.value?.success,
  error: executionStatus.value !== ExecutionStatus.executing && !executionResult.value?.success,
}));

// Watchers
watch(
  () => props.code,
  (newCode) => {
    updateHighlight(newCode, props.lang);
  },
);

watch(
  isEditing,
  async (newValue, oldValue) => {
    if (oldValue && !newValue && textareaRef.value) {
      const code = textareaRef.value.value;
      updateHighlight(code, props.lang);
      emit('update:code', code);

      // TypeScriptの場合は自動保存
      if (props.lang === 'TypeScript' && props.filename) {
        await saveTypeScript({
          lang: 'TypeScript',
          code,
          fileName: props.filename,
        });
      }
    }
  },
);

// Initial highlight
updateHighlight(props.code, props.lang);

// Methods
const startEditing = () => {
  startEditingBase(props.editable);
};

const handleExecute = async () => {
  executionStatus.value = ExecutionStatus.executing;
  executionResult.value = {
    output: '',
    exitCode: 0,
    success: true,
  };
  resetResultHighlight();
  currentProcessId.value = null;

  const result = await executeBash(
    { lang: 'bash', code: getCurrentCode() },
    {
      onChunk: (chunk) => {
        executionResult.value!.output += chunk;
        updateResultHighlight(executionResult.value!.output);
      },
      onProcessId: (id) => {
        currentProcessId.value = id;
      },
    }
  );

  executionResult.value = result;
  if (result?.output) {
    await updateResultHighlight(result.output);
  }
  executionStatus.value = ExecutionStatus.completed;
  currentProcessId.value = null;
};

const handleKill = async () => {
  if (currentProcessId.value) {
    await killProcess(currentProcessId.value);
    currentProcessId.value = null;
    executionStatus.value = ExecutionStatus.interrupted;
    // 中断時点の出力を保持しつつステータスを更新
    if (executionResult.value) {
      executionResult.value.success = false;
      executionResult.value.error = 'Process killed';
      if (executionResult.value.output) {
        await updateResultHighlight(executionResult.value.output);
      }
    }
  }
};
</script>

<template>
  <div class="code-block-container">
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
            :style="{ height: textareaHeight }"
          >{{ props.code }}</textarea></code></pre>
        </div>
        <button
          v-if="props.lang === 'bash' && !isExecuting"
          class="execute-btn"
          @click.stop="handleExecute"
        >
          ▶ 実行
        </button>
        <button
          v-if="props.lang === 'bash' && isExecuting"
          class="execute-btn stop-btn"
          @click.stop="handleKill"
        >
          ⏹ 停止
        </button>
      </div>
    </div>
    <div v-if="executionResult" class="execution-result" :class="resultClass">
      <div class="result-header">
        <span class="result-status">{{ resultStatusText }}</span>
      </div>
      <div v-if="highlightedResultHtml" class="result-output" v-html="highlightedResultHtml" />
      <pre v-else class="result-output">{{ executionResult.output || executionResult.error }}</pre>
    </div>
  </div>
</template>

<style scoped>
.code-block-container {
  margin-bottom: 16px;
}

.code-block-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #121212;
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

.execute-btn.stop-btn {
  background: #e55;
}

.execute-btn.stop-btn:hover {
  background: #d44;
}

.code-block {
  position: relative;
  display: flex;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 16px;
  line-height: 1.25;
  overflow-x: auto;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  padding: 12px;
  background: #0d0d0d;
  color: #666;
  text-align: right;
  user-select: none;
  border-right: 1px solid #222;
  font-size: 12px;
  line-height: 1.25;
}

.line-numbers span {
  display: block;
  height: 20px;
  line-height: 20px;
}


.code-content {
  flex: 1;
  position: relative;
  min-width: 0;
}

.highlighted-code {
  padding: 12px;
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
  padding: 12px !important;
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
  font-size: 16px;
  line-height: 20px;
}

.execution-result {
  margin-top: 16px;
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

.execution-result.streaming {
  border-color: #4a9eff;
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
