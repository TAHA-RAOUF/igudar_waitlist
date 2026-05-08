// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    resendFromEmail: process.env.RESEND_FROM_EMAIL,
    resendToEmail: process.env.RESEND_TO_EMAIL,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY
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