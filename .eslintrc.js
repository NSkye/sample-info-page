module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  /**
   * Подключение сета правил standard.js (https://standardjs.com/)
   */
  'extends': [
    'standard',
    'plugin:vue/essential'
  ],
  /**
   * Позволяет работать с .vue файлами
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
     * Нужно указывать, т.к. по умолчанию SwitchCase не имеет дополнительных отступов, что делает его весьма трудночитаемым
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
     * Не припомню, когда я делал подобные ошибки, поэтому предпочитаю использовать == когда это приемлемо, мне кажется, что так получается чище
     */
    'eqeqeq': [
      'off'
    ],
    /**
     * Это правило забаговано и не работает, оно выстреливает даже тогда, когда нет неиспользуемых компонентов
     */
    'vue/no-unused-components': [
      'off'
    ]
  }
}