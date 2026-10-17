import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        whatWeDo: resolve(__dirname, 'what-we-do.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
