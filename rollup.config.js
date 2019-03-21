import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default [

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)

  // Instructions for publishing a beta version:
  // npm version pre<major|minor|patch> --preid=beta (e.g. npm version preminor --preid=beta)
  // npm publish --tag=beta --otp=000000

  {
    input: 'src/index.js',
    external: [
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      postcss({
        modules: true,
      }),
      babel({
        exclude: ['node_modules/**'],
        presets: [
          '@babel/preset-react',
          ['@babel/preset-env', {
            modules: false,
          }],
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-optional-chaining',
        ],
      }),
      resolve(),
      commonjs(),
    ],
  },
];
