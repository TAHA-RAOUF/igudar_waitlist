<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2, CheckCircle2 } from 'lucide-vue-next'

const email = ref('')
const selectedRole = ref('')
const isDialogOpen = ref(false)
const isSubmitting = ref(false)
const serverMessage = ref('')
const isSuccess = ref(false)

const handleEmailSubmit = () => {
  serverMessage.value = ''
  isSuccess.value = false

  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    serverMessage.value = 'Please enter a valid email address.'
    return
  }

  isDialogOpen.value = true
}

const submitFinal = async () => {
  if (!selectedRole.value) return
  isSubmitting.value = true

  try {
    await $fetch('/api/waitlist', {
      method: 'POST',
      body: {
        email: email.value,
        status: selectedRole.value
      }
    })
    serverMessage.value = 'Thanks for joining!'
    isSuccess.value = true
    email.value = ''
    selectedRole.value = ''
    isDialogOpen.value = false
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

        <div class="h-20 flex items-center justify-center relative w-full max-w-md mx-auto">
          <transition 
            enter-active-class="transition-all duration-500 ease-out absolute w-full"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in absolute w-full"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
          >
            <form v-if="!isSuccess" @submit.prevent="handleEmailSubmit" class="flex flex-col sm:flex-row gap-3 w-full">
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
                Join now
              </Button>
            </form>

            <div v-else class="flex flex-col items-center justify-center w-full bg-green-50 text-green-700 border border-green-200 rounded-full h-14 px-6 shadow-sm">
              <div class="flex items-center gap-2 font-semibold text-base">
                <CheckCircle2 class="w-5 h-5" />
                <span>You're on the list! We'll be in touch.</span>
              </div>
            </div>
          </transition>
        </div>
        
        <div class="mt-2 min-h-[24px]">
          <p v-if="serverMessage && !isSuccess" class="text-sm font-medium text-red-600">
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

      <!-- Role Selection Dialog -->
      <Dialog :open="isDialogOpen" @update:open="val => isDialogOpen = val">
        <DialogContent class="sm:max-w-md">
          <DialogHeader>
            <DialogTitle class="text-xl">What best describes you? <span class="text-red-500">*</span></DialogTitle>
            <DialogDescription>Please select one of the following to complete your registration.</DialogDescription>
          </DialogHeader>
          <div class="py-4">
            <RadioGroup v-model="selectedRole" class="flex flex-col gap-2">
              <label 
                for="r-student" 
                :class="['flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-colors', selectedRole === 'student' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50']"
              >
                <RadioGroupItem id="r-student" value="student" />
                <span class="font-medium text-sm text-neutral-900">Student</span>
              </label>
              
              <label 
                for="r-founder" 
                :class="['flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-colors', selectedRole === 'founder_entrepreneur' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50']"
              >
                <RadioGroupItem id="r-founder" value="founder_entrepreneur" />
                <span class="font-medium text-sm text-neutral-900">Founder/Entrepreneur</span>
              </label>
              
              <label 
                for="r-corp" 
                :class="['flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-colors', selectedRole === 'corporate_industry_professional' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50']"
              >
                <RadioGroupItem id="r-corp" value="corporate_industry_professional" />
                <span class="font-medium text-sm text-neutral-900">Corporate/Industry Professional</span>
              </label>

              <label 
                for="r-researcher" 
                :class="['flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-colors', selectedRole === 'researcher_academic' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50']"
              >
                <RadioGroupItem id="r-researcher" value="researcher_academic" />
                <span class="font-medium text-sm text-neutral-900">Researcher/Academic</span>
              </label>

              <label 
                for="r-investor" 
                :class="['flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-colors', selectedRole === 'investor' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50']"
              >
                <RadioGroupItem id="r-investor" value="investor" />
                <span class="font-medium text-sm text-neutral-900">Investor</span>
              </label>

              <label 
                for="r-family" 
                :class="['flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-colors', selectedRole === 'family_of_team_member' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50']"
              >
                <RadioGroupItem id="r-family" value="family_of_team_member" />
                <span class="font-medium text-sm text-neutral-900">Family of Team Member</span>
              </label>

              <label 
                for="r-other" 
                :class="['flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-colors', selectedRole === 'other' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50']"
              >
                <RadioGroupItem id="r-other" value="other" />
                <span class="font-medium text-sm text-neutral-900">Other</span>
              </label>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              @click="submitFinal" 
              class="w-full bg-neutral-900 hover:bg-neutral-800 text-white h-12 rounded-full font-semibold transition-all" 
              :disabled="isSubmitting || !selectedRole"
            >
              <Loader2 v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" />
              <span>{{ isSubmitting ? 'Joining...' : 'Complete Submission' }}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: #f5f5f5;
}
</style>