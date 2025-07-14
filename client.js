import { defineClientConfig } from '@vuepress/client';
import MobaXterm from './MobaXterm.vue';

export default defineClientConfig({
  enhance({ app }) {
    app.component('MobaXterm', MobaXterm);
  },
});