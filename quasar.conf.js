/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */

module.exports = function (ctx) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      'i18n',
      'axios',
      'vuelidate',
      'masterAxios',
      'vue-lodash'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss',
      'app.styl'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'ionicons-v4',
      // 'mdi-v5',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      env: ctx.dev
        ? {
          MASTER_KEY: process.env.MASTER_KEY
            ? process.env.MASTER_KEY
            : '1a7d63af8db2160bd463f77e2a352ec8b3e23fa7eefaddde90552f5f96bc55a4e47b871d5722ad7ef1f7ef27f419ba36e3db62cb2934a0ef797469108ef152fb'
          ,
          // so on dev we'll have
          API_URL: process.env.API_URL,
          GOOGLE_MAPS_KEY: 'AIzaSyAcR72iWzrqHk3Nx94_-qqSb0xupA-O1ZY'

        } : {
          MASTER_KEY:
            '1a7d63af8db2160bd463f77e2a352ec8b3e23fa7eefaddde90552f5f96bc55a4e47b871d5722ad7ef1f7ef27f419ba36e3db62cb2934a0ef797469108ef152fb',
          // and on build (production):
          API_URL: process.env.API_URL,
          GOOGLE_MAPS_KEY: 'AIzaSyAcR72iWzrqHk3Nx94_-qqSb0xupA-O1ZY'

        },
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      scopeHoisting: true,
      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/handling-webpack
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack
      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: 'all',

      // Quasar plugins
      plugins: ['Notify', 'Dialog'],
      config: {
        notify: {
          /* Notify defaults */
          position: 'top-right',
          color: 'green',
          timeout: 2000
        }
      }
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

  }
}
