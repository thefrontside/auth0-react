import del from 'rollup-plugin-delete';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';

const PORT = 3000;
const name = 'reactAuth0';

export default {
  input: 'src/index.tsx',
  output: {
    name,
    file: 'dist/auth0-react.js',
    format: 'umd',
  },
  plugins: [
    del({ targets: 'dist/*', runOnce: true }),
    typescript({ useTsconfigDeclarationDir: true }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': [
          'createElement'
        ],
      }
    }),
    globals(),
    serve({
      contentBase: ['dist', 'static'],
      open: true,
      port: PORT
    }),
    livereload()
  ]
}
