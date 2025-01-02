// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    util: "util/",
  },
  ssr: false,
  typescript: {
    shim: false
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    serveStatic: true,
  },
  devServerHandlers: [],
  hooks: {
  },
})


