<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
      <p class="text-xl text-muted-foreground">
        Get in touch about commissions, purchases, or general inquiries
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Contact Info -->
      <div>
        <h2 class="text-2xl font-bold mb-6">Contact Information</h2>
        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <div class="mt-1">
              <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold mb-1">Email</h3>
              <a href="mailto:info@robertgaunceart.com" class="text-primary hover:underline">
                info@robertgaunceart.com
              </a>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="mt-1">
              <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold mb-1">Location</h3>
              <p class="text-muted-foreground">Paris, Kentucky</p>
              <p class="text-sm text-muted-foreground">Serving Paris, Lexington, and surrounding areas</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="mt-1">
              <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold mb-1">Response Time</h3>
              <p class="text-muted-foreground">
                Robert typically responds within 1-2 business days
              </p>
            </div>
          </div>
        </div>

        <div class="mt-8 p-6 bg-primary/10 rounded-lg">
          <h3 class="font-semibold mb-2">Interested in a Commission?</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Use the form to request a custom commission or visit the commissions page for more details.
          </p>
          <NuxtLink 
            to="/commissions" 
            class="inline-flex items-center text-primary hover:underline font-medium"
          >
            View Commission Process →
          </NuxtLink>
        </div>
      </div>

      <!-- Contact Form -->
      <div>
        <h2 class="text-2xl font-bold mb-6">Send a Message</h2>
        <div class="bg-card p-6 rounded-lg border">
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium mb-2">Name *</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name"
                required
                class="w-full px-4 py-2 border rounded-md bg-background"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium mb-2">Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                required
                class="w-full px-4 py-2 border rounded-md bg-background"
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium mb-2">Subject *</label>
              <select 
                id="subject" 
                v-model="form.subject"
                required
                class="w-full px-4 py-2 border rounded-md bg-background"
              >
                <option value="">Select a subject...</option>
                <option value="commission">Commission Inquiry</option>
                <option value="purchase">Purchase Inquiry</option>
                <option value="general">General Question</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium mb-2">Message *</label>
              <textarea 
                id="message" 
                v-model="form.message"
                required
                rows="6"
                class="w-full px-4 py-2 border rounded-md bg-background"
              ></textarea>
            </div>

            <button 
              type="submit"
              class="w-full rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Contact - Robert Gaunce Art',
  description: 'Contact Robert Gaunce about commissions, artwork purchases, or general inquiries. Serving Paris and Lexington, Kentucky.',
  ogTitle: 'Contact Robert Gaunce',
  ogDescription: 'Get in touch about commissions, purchases, or general inquiries.',
})

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = async () => {
  // TODO: Connect to backend/email service
  console.log('Contact form:', form.value)
  alert('Thank you for your message! Robert will get back to you soon.')
}
</script>

