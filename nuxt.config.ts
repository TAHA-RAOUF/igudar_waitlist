// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    resendFromEmail: process.env.RESEND_FROM_EMAIL,
    resendToEmail: process.env.RESEND_TO_EMAIL
  },

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
})