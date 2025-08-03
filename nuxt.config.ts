import "./shared/env";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "nuxt-security",
    "@nuxt/eslint",
    "@pinia/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  pages: {
    pattern: ["**/*.vue", "!**/*.ts"],
  },

  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "blob:",
          "https://res.cloudinary.com",
          "https://maps.googleapis.com",
          "https://maps.gstatic.com",
        ],
      },
    },
  },

  nitro: {
    prerender: {
      routes: ["/", "/contact", "/about"],
    },
  },
});
