const bodyParser = require('body-parser');

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'style', href: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"}
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {},
  loading: {
    color: 'snow',
    height: '5px'
  },
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'black'
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxtapp-e69a7.firebaseio.com',
    fbAPIKey: 'AIzaSyCg4-VJveHmg0nSocbMVk0Bl7JbnS_K2pI',
  },
  transitions: {
    name: 'fade',
    mode: 'out-in',
  },
  serverMiddleware: [
    bodyParser.json(),
    '~/api',
  ],
}
