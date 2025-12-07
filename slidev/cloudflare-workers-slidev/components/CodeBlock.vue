<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { codeToHtml } from 'shiki';

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

const internalCode = ref(props.code);
const highlightedHtml = ref('');
const isEditing = ref(false);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const updateHighlight = () => {
  codeToHtml(internalCode.value, {
    lang: props.lang,
    theme: props.theme,
  })
    .then((html) => {
      highlightedHtml.value = html;
    })
    .catch(() => {
      highlightedHtml.value = `<pre><code>${internalCode.value}</code></pre>`;
    });
};

watch(
  () => props.code,
  (newCode) => {
    internalCode.value = newCode;
  },
);

watch(
  isEditing,
  (newValue, oldValue) => {
    if (oldValue && !newValue) {
      updateHighlight();
      emit('update:code', internalCode.value);
    }
  },
);

// Initial highlight
updateHighlight();

const startEditing = () => {
  if (!props.editable) return;
  isEditing.value = true;
  setTimeout(() => {
    textareaRef.value?.focus();
  }, 0);
};

const stopEditing = () => {
  if (textareaRef.value) {
    internalCode.value = textareaRef.value.value;
  }
  isEditing.value = false;
};

const lineCount = computed(() => internalCode.value.split('\n').length);
</script>

<template>
  <div class="code-block-wrapper">
    <div v-if="filename" class="filename-bar">
      {{ filename }}
    </div>
    <div class="code-block" @click="startEditing">
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
          :value="internalCode"
          @blur="stopEditing"
          class="code-textarea"
          :spellcheck="false"
        /></code></pre>
      </div>
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

.filename-bar {
  padding: 8px 16px;
  background: #333;
  color: #ccc;
  font-size: 12px;
  border-bottom: 1px solid #444;
}

.code-block {
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
</style>
