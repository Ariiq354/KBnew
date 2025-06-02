// https://nuxt.com/docs/api/configuration/nuxt-config
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

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseAuthToken: process.env.DATABASE_AUTH_TOKEN,
  },

  pages: {
    pattern: ["**/*.vue", "!**/*.ts"],
  },

  security: {
    headers: {
      permissionsPolicy: {
        camera: false,
      },
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "https://res.cloudinary.com",
          "https://maps.googleapis.com",
          "https://maps.gstatic.com",
        ],
      },
    },
  },

  nitro: {
    prerender: {
      routes: ["/", "/contact", "/product", "/about"],
    },
  },
});
