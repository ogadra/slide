<script setup lang="ts">
import { ref } from 'vue';
import { startSandbox } from '../composables/useCodeExecution';
import { useSandboxUrl } from '../composables/useSandboxUrl';

const { sandboxUrl, setSandboxUrl } = useSandboxUrl();
const iframeKey = ref(0);
const isRetrying = ref(false);

const reloadIframe = () => {
  iframeKey.value++;
};

const retrySandbox = async () => {
  isRetrying.value = true;
  try {
    const result = await startSandbox();
    if (result?.url) {
      setSandboxUrl(result.url);
    }
  } finally {
    isRetrying.value = false;
  }
};
</script>

<template>
  <div class="sandbox-preview">
    <div v-if="sandboxUrl" class="iframe-container">
      <div class="toolbar">
        <span class="url-display">{{ sandboxUrl }}</span>
        <button class="reload-button" @click="reloadIframe" title="Reload">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 2v6h-6"></path>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
            <path d="M3 22v-6h6"></path>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
          </svg>
        </button>
      </div>
      <iframe
        :key="iframeKey"
        :src="sandboxUrl"
        class="preview-iframe"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
    <div v-else class="loading">
      <span>{{ isRetrying ? 'Connecting...' : 'Disconnected' }}</span>
      <button class="retry-button" :disabled="isRetrying" @click="retrySandbox" title="Retry">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ spinning: isRetrying }">
          <path d="M21 2v6h-6"></path>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
          <path d="M3 22v-6h6"></path>
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
        </svg>
        <span>{{ isRetrying ? 'Connecting...' : 'Connect' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.sandbox-preview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
}

.iframe-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background: #2a2a3e;
  border-bottom: 1px solid #3a3a4e;
  min-width: 0;
}

.url-display {
  flex: 1;
  min-width: 0;
  font-size: 12px;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 8px;
}

.reload-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: #aaa;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.reload-button:hover {
  background: #3a3a4e;
  color: #fff;
}

.preview-iframe {
  flex: 1;
  width: 100%;
  border: none;
  background: white;
}

.loading {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #888;
  font-size: 14px;
}

.retry-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #3a3a4e;
  border: none;
  border-radius: 6px;
  color: #ccc;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.retry-button:hover:not(:disabled) {
  background: #4a4a5e;
  color: #fff;
}

.retry-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
