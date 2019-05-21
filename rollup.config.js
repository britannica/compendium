import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default [

  // Just for CommonJS (for Node) build.
  // Instructions for publishing a beta version:
  // npm version pre<major|minor|patch> --preid=beta (e.g. npm version preminor --preid=beta)
  // npm version 2.0.0-beta.1
  // npm publish --tag=beta --otp=000000

  {
    input: 'src/index.js',
    external: [
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies),
    ],
    output: { file: pkg.main, format: 'cjs' },
    plugins: [
      postcss({
        modules: true,
      }),
      babel({
        exclude: ['node_modules/**'],
        presets: [
          '@babel/preset-react',
          [
            '@babel/preset-env',
            {
              modules: false,
            },
          ],
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-syntax-dynamic-import',
        ],
      }),
      resolve(),
      commonjs(),
    ],
  },
];
