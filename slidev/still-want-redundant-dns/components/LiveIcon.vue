<script setup lang="ts">
import {
  ConnectionStatusEnum,
  changeConnectionState,
  connectionStatus,
  getWsInstance,
} from '../setup/connectionState';

const changeConnectionStatus = () => {
  switch (connectionStatus.value) {
    case ConnectionStatusEnum.Connected:
    case ConnectionStatusEnum.Connecting:
      changeConnectionState(ConnectionStatusEnum.Disconnected);
      break;

    case ConnectionStatusEnum.Disconnected: {
      const ws = getWsInstance();
      if (ws && ws.readyState === WebSocket.OPEN) {
        changeConnectionState(ConnectionStatusEnum.Connected);
      } else {
        changeConnectionState(ConnectionStatusEnum.Connecting);
      }
      break;
    }
  }
};

</script>

<template>
  <div class="fixed top-4 right-4 z-50">
    <button
      @click="changeConnectionStatus"
      class="relative flex items-center w-24 h-8 px-2 rounded-full transition-colors duration-300"
      :class="{
        'bg-red-600 shadow-lg shadow-red-500/50': connectionStatus === ConnectionStatusEnum.Connected,
        'bg-yellow-600 shadow-lg shadow-yellow-500/50': connectionStatus === ConnectionStatusEnum.Connecting,
        'bg-gray-700 hover:bg-gray-600': connectionStatus === ConnectionStatusEnum.Disconnected
      }"
    >
      <span
        class="absolute w-3 h-3 rounded-full transition-all duration-300 ease-in-out"
        :class="{
          'bg-white animate-pulse left-[calc(100%-1rem)]': connectionStatus === ConnectionStatusEnum.Connected,
          'bg-yellow-200 animate-ping left-1/2 -translate-x-1/2': connectionStatus === ConnectionStatusEnum.Connecting,
          'bg-gray-500 left-2': connectionStatus === ConnectionStatusEnum.Disconnected
        }"
      />
      <span
        class="w-full text-center text-xs font-semibold uppercase tracking-wide"
        :class="{
          'text-white': connectionStatus === ConnectionStatusEnum.Connected || connectionStatus === ConnectionStatusEnum.Connecting,
          'text-gray-300': connectionStatus === ConnectionStatusEnum.Disconnected
        }"
      >
        <template v-if="connectionStatus === ConnectionStatusEnum.Connected">Live</template>
        <template v-else-if="connectionStatus === ConnectionStatusEnum.Connecting"><span class="text-[11.5px]">Connecting</span></template>
        <template v-else>Off</template>
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
