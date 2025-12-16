import { ref } from 'vue';

const sandboxUrl = ref<string | null>(null);

export const useSandboxUrl = () => {
  const setSandboxUrl = (url: string) => {
    sandboxUrl.value = url;
  };

  return {
    sandboxUrl,
    setSandboxUrl,
  };
};
