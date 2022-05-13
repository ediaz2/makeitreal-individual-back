import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import run from '@rollup/plugin-run';
import { resolve } from 'node:path';
import { env } from 'node:process';
import { defineConfig } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';

import { dependencies } from './package.json';

const dev = env.ROLLUP_WATCH === 'true';

const projectRootDir = resolve(__dirname);

const config = defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist/',
    format: 'es',
    preserveModules: true,
  },
  external: Object.keys(dependencies || {}),
  plugins: [
    nodeResolve({ extensions: ['.ts', '.json'] }),
    alias({
      entries: [{ find: '~', replacement: resolve(projectRootDir, 'src') }],
    }),
    json(),
    esbuild({ charset: 'utf8', color: true }),
    dev && run(),
  ],
});

export default config;
