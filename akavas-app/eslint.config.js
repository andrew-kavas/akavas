// import coderiety from 'eslint-config-coderiety';

// export default coderiety;
import config from 'eslint-config-coderiety';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  ...config,
  { ...react.configs.flat.recommended, ignores: ['src/web-clipper/**'] },
  { plugins: { 'react-hooks': reactHooks }, ignores: ['src/web-clipper/**'] },
  {
    rules: {
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react/display-name': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-unknown-property': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off'
    },
    settings: { react: { version: '19' } },
    ignores: ['src/web-clipper/**']
  },
  {
    ignores: [
      'src/inline-entry.js',
      'src/service-worker.js',
      'src/vendor/**',
      'src/web-clipper.js',
      'src/web-form.js'
    ]
  }
];
