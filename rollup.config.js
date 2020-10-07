import del from 'rollup-plugin-delete';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import replace from '@rollup/plugin-replace';

const PORT = 3000;
const name = 'reactAuth0';

const plugins = [
  del({ targets: 'dist/*', runOnce: true }),
  typescript({ useTsconfigDeclarationDir: true }),
  resolve(),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/react/index.js': [
        'createContext',
        'createElement',
        'FC',
        'useContext',
        'useEffect',
        'useReducer',
        'useState',
      ],
      'src/index.ts': [
        'Auth0Provider'
      ]
    }
  }),
  globals(),
];

export default {
  input: 'src/index.ts',
  output: {
    name,
    file: 'dist/auth0-react.js',
    format: 'umd'
  },
  plugins: [
    ...plugins,
    ...(process.env.REACT_APP_SIMULATION_ENABLE ? [
      serve({
        contentBase: ['dist', 'static'],
        open: false,
        port: PORT
      }),
      replace({
        'process.env.REACT_APP_SIMULATION_ENABLE': !process.env.REACT_APP_SIMULATION_ENABLE
      })
    ] : [
      serve({
        contentBase: ['dist', 'static'],
        open: true,
        port: PORT
      }),
      livereload()
    ])
  ]
}
