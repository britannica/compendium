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

  {
    input: 'src/index.js',
    external: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/pro-light-svg-icons',
      '@fortawesome/pro-regular-svg-icons',
      '@fortawesome/pro-solid-svg-icons',
      '@fortawesome/react-fontawesome',
      'react-router-dom',
      'prop-types',
      'react',
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
        ],
      }),
      resolve(),
      commonjs(),
    ],
  },
];
