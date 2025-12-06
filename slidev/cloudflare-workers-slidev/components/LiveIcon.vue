<script setup lang="ts">
import {
  ConnectionStatusEnum,
  changeConnectionState,
  connectionStatus,
  getWsInstance,
} from '../setup/connectionState';
import { connectWebSocket } from '../setup/main';

const changeConnectionStatus = () => {
  switch (connectionStatus.value) {
    case ConnectionStatusEnum.Connected:
    case ConnectionStatusEnum.Connecting:
      changeConnectionState(ConnectionStatusEnum.Disconnected);
      break;

    case ConnectionStatusEnum.Disconnected: 
      const ws = getWsInstance();
      if (ws && ws.readyState === WebSocket.OPEN) {
        changeConnectionState(ConnectionStatusEnum.Connected);
      } else {
        changeConnectionState(ConnectionStatusEnum.Connecting);
        connectWebSocket();
      }
      break;
  }
};

</script>

<template>
  <div class="fixed top-4 right-4 z-50">
    <button
      @click="changeConnectionStatus"
      class="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300"
      :class="{
        'bg-red-600 text-white shadow-lg shadow-red-500/50': connectionStatus === ConnectionStatusEnum.Connected,
        'bg-yellow-600 text-white shadow-lg shadow-yellow-500/50': connectionStatus === ConnectionStatusEnum.Connecting,
        'bg-gray-700 text-gray-300 hover:bg-gray-600': connectionStatus === ConnectionStatusEnum.Disconnected
      }"
    >
      <span
        class="w-2.5 h-2.5 rounded-full"
        :class="{
          'bg-white animate-pulse': connectionStatus === ConnectionStatusEnum.Connected,
          'bg-yellow-200 animate-ping': connectionStatus === ConnectionStatusEnum.Connecting,
          'bg-gray-500': connectionStatus === ConnectionStatusEnum.Disconnected
        }"
      />
      <span class="text-sm font-semibold uppercase tracking-wide">
        {{ connectionStatus === ConnectionStatusEnum.Connected ? 'Live' : connectionStatus === ConnectionStatusEnum.Connecting ? 'Connecting' : 'Off' }}
      </span>
    </button>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
  border: none;
  outline: none;
}
</style>
