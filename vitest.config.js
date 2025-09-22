import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: ['./src/lib/test/core.js'],
    watch: false,
    coverage: {
      provider: 'v8',
      reporter: ['text'],
    },
  },
});
