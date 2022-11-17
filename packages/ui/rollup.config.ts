import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

export default defineConfig({
  external: [
    'react/jsx-runtime',
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies),
  ],
  input: 'src/index.tsx',
  output: {
    inlineDynamicImports: true,
    file: 'build/bundle.js',
    name: 'ui',
  },
  plugins: [
    typescript(),
    postcss({
      plugins: [autoprefixer()],
      extract: 'styles.css',
      autoModules: true,
      namedExports: true,
      sourceMap: true,
      minimize: true,
    }),
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
  },
});
