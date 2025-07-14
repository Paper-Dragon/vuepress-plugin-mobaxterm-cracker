import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const mobaxtermCrackerPlugin = () => ({
  name: 'vuepress-plugin-mobaxterm-cracker',
  clientConfigFile: resolve(__dirname, './client.js').replace(/\\/g, '/'),
});

export default mobaxtermCrackerPlugin;