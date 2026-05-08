<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const isSubmitting = ref(false)
const serverMessage = ref('')
const isSuccess = ref(false)

const handleSubmit = async () => {
  serverMessage.value = ''
  isSuccess.value = false

  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    serverMessage.value = 'Please enter a valid email address.'
    return
  }

  isSubmitting.value = true

  try {
    await $fetch('/api/waitlist', {
      method: 'POST',
      body: {
        email: email.value
      }
    })
    serverMessage.value = 'Thanks for joining!'
    isSuccess.value = true
    email.value = ''
  } catch (error) {
    serverMessage.value = 'Something went wrong. Please try again.'
    isSuccess.value = false
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-100 p-4 md:p-8 flex items-center justify-center font-sans antialiased">
    <div class="w-full max-w-5xl bg-white rounded-[2rem] overflow-hidden flex flex-col relative min-h-[750px] border border-neutral-200/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)]">
      <!-- Grid lines -->
      <div class="hidden md:block absolute left-24 top-0 bottom-0 w-px bg-neutral-100 z-0"></div>
      <div class="hidden md:block absolute right-24 top-0 bottom-0 w-px bg-neutral-100 z-0"></div>
      <div class="absolute top-24 left-0 right-0 h-px bg-neutral-100 z-0"></div>
      <div class="absolute bottom-24 left-0 right-0 h-px bg-neutral-100 z-0"></div>

      <!-- Header -->
      <header class="relative z-10 h-24 flex items-center justify-center">
        <img src="/igudar-logo.png" alt="Logo" class="w-60 h-60" />
      </header>

      <!-- Main Content -->
      <main class="relative z-10 flex-1 flex flex-col items-center justify-center px-4 md:px-32 text-center py-12">
        <div class="mb-8">
          <span class="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-bold text-neutral-600 shadow-sm uppercase tracking-widest">
            Launching Soon!
          </span>
        </div>
        
        <h1 class="text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
          Every Big Idea <br class="hidden md:block" /> starts with a waitlist
        </h1>
        
        <p class="text-lg md:text-xl text-neutral-500 mb-10 max-w-xl mx-auto font-medium">
          Start building wealth together — join the IGUDAR waitlist.
        </p>

        <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
          <div class="relative flex-1">
            <Input 
              v-model="email" 
              type="email" 
              placeholder="name@domain.com" 
              class="h-14 w-full rounded-full px-6 bg-white border border-neutral-200 shadow-sm text-base text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-0 transition-all"
              :disabled="isSubmitting"
            />
          </div>
          <Button 
            type="submit" 
            class="h-14 rounded-full px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-base shadow-sm transition-all sm:w-auto w-full flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Joining...' : 'Join now' }}
          </Button>
        </form>

        <div class="mt-4 min-h-[24px]">
          <p v-if="serverMessage" :class="['text-sm font-medium', isSuccess ? 'text-green-600' : 'text-red-600']">
            {{ serverMessage }}
          </p>
        </div>
      </main>

      <!-- Avatars / Social Proof -->
      <div class="relative z-10 h-32 flex flex-col sm:flex-row items-center justify-center gap-4 bg-neutral-50/50">
        <div class="flex -space-x-3">
          <Avatar class="w-10 h-10 border-2 border-white">
            <AvatarImage src="https://i.pravatar.cc/100?img=11" alt="Avatar 1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar class="w-10 h-10 border-2 border-white">
            <AvatarImage src="https://i.pravatar.cc/100?img=5" alt="Avatar 2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar class="w-10 h-10 border-2 border-white">
            <AvatarImage src="https://i.pravatar.cc/100?img=3" alt="Avatar 3" />
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
        </div>
        <span class="text-sm font-medium text-neutral-500">
          40 people have already joined
        </span>
      </div>

      <!-- Footer -->
      <!-- <footer class="relative z-10 h-24 flex items-center justify-center text-xs font-semibold text-neutral-400">
        <span>© 2025</span>
        <span class="mx-2">•</span>
        <a href="#" class="hover:text-neutral-600 transition-colors">Get this template</a>
        <span class="mx-2">•</span>
        <span>Built in <strong class="text-neutral-600">Framer</strong></span>
      </footer> -->
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: #f5f5f5;
}
</style>