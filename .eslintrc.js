module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  /**
   * Enabling standard.js ruleset (https://standardjs.com/)
   */
  'extends': [
    'standard',
    'plugin:vue/essential'
  ],
  /**
   * Allows to process vue files
   */
  'plugins': [
    'vue'
  ],
  'parserOptions': {
    'parser': 'babel-eslint',
    'sourceType': 'module',
    'ecmaVersion': 2018
  },
  'rules': {
    /**
     * Needs to be specified as by default SwitchCase is set to 0 and it's quite hard to read
     */
    'indent': [
      'error',
      2, {
        'SwitchCase': 1
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    /**
     * I hardly remember when I made this kind of mistake, so I prefer to use == when it's acceptable, just looks cleaner to me
     */
    'eqeqeq': [
      'off'
    ],
    /**
     * This rule is set to error by default and its really buggy so it fires literally always, even when component is actually being used
     */
    'vue/no-unused-components': [
      'off'
    ]
  }
}