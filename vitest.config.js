import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['./src/**/*.test.{ts,tsx}'],
    isolate: false,
    pool: 'threads',
    watch: false,
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text'],
    },
  },
});
