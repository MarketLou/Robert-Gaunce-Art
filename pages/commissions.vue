<template>
  <div class="container mx-auto px-4 py-12 max-w-6xl">
    <!-- Header -->
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Commission Artwork</h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        Custom watercolor artwork tailored to your vision
      </p>
    </header>

    <!-- Commission Types -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-center mb-8">Available Commission Types</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
          <div class="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
            <img src="/Logan.jpg" alt="Portrait Commission Example" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Portraits</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Detailed portrait commissions capturing the essence of your subject
          </p>
        </div>
        <div class="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
          <div class="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
            <img src="/pond_watercolor.png" alt="Nature & Wildlife Example" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Nature & Wildlife</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Beautiful nature scenes and wildlife art in Robert's signature watercolor style
          </p>
        </div>
        <div class="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
          <div class="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
            <img src="/wolverine_watercolor.jpg" alt="Watercolor Cartoon Example" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Watercolor Cartoons</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Playful and expressive cartoon illustrations in watercolor
          </p>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-center mb-8">Commission Process</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        <div class="text-center">
          <div class="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
          <h3 class="font-semibold mb-2">Submit Request</h3>
          <p class="text-sm text-muted-foreground">Fill out the commission form with your ideas and requirements</p>
        </div>
        <!-- Arrow 1 to 2 -->
        <div class="hidden md:block absolute top-6 left-[calc(25%-1rem)] w-[calc(25%-2rem)]">
          <svg class="w-full h-6" viewBox="0 0 100 24" preserveAspectRatio="none">
            <line x1="0" y1="12" x2="85" y2="12" stroke="currentColor" stroke-width="2" class="text-primary/30"/>
            <polygon points="85,8 85,16 100,12" fill="currentColor" class="text-primary/30"/>
          </svg>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
          <h3 class="font-semibold mb-2">Consultation</h3>
          <p class="text-sm text-muted-foreground">Robert will review your request and discuss details</p>
        </div>
        <!-- Arrow 2 to 3 -->
        <div class="hidden md:block absolute top-6 left-[calc(50%-1rem)] w-[calc(25%-2rem)]">
          <svg class="w-full h-6" viewBox="0 0 100 24" preserveAspectRatio="none">
            <line x1="0" y1="12" x2="85" y2="12" stroke="currentColor" stroke-width="2" class="text-primary/30"/>
            <polygon points="85,8 85,16 100,12" fill="currentColor" class="text-primary/30"/>
          </svg>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
          <h3 class="font-semibold mb-2">Deposit</h3>
          <p class="text-sm text-muted-foreground">Secure your commission with a deposit payment</p>
        </div>
        <!-- Arrow 3 to 4 -->
        <div class="hidden md:block absolute top-6 left-[calc(75%-1rem)] w-[calc(25%-2rem)]">
          <svg class="w-full h-6" viewBox="0 0 100 24" preserveAspectRatio="none">
            <line x1="0" y1="12" x2="85" y2="12" stroke="currentColor" stroke-width="2" class="text-primary/30"/>
            <polygon points="85,8 85,16 100,12" fill="currentColor" class="text-primary/30"/>
          </svg>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
          <h3 class="font-semibold mb-2">Artwork</h3>
          <p class="text-sm text-muted-foreground">Receive your completed custom artwork</p>
        </div>
      </div>
    </section>

    <!-- Pricing Guide -->
    <section class="mb-16 bg-muted/30 p-8 rounded-lg">
      <h2 class="text-3xl font-bold text-center mb-8">Pricing Guide</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div>
          <h3 class="text-xl font-semibold mb-4">Factors Affecting Price</h3>
          <ul class="space-y-2 text-muted-foreground">
            <li>• Artwork size and dimensions</li>
            <li>• Complexity of the subject</li>
            <li>• Medium (watercolor, ink, mixed media)</li>
            <li>• Timeline for completion</li>
            <li>• Number of subjects in the piece</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4">Typical Range</h3>
          <p class="text-muted-foreground mb-4">
            Commission prices typically range from $200 to $2,000+ depending on the above factors. 
            A detailed quote will be provided after reviewing your specific requirements.
          </p>
          <p class="text-sm text-muted-foreground">
            <strong>Note:</strong> A 50% deposit is required to begin work on your commission.
          </p>
        </div>
      </div>
    </section>

    <!-- Commission Form -->
    <section class="max-w-2xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">Request a Commission</h2>
      <div class="bg-card p-8 rounded-lg border">
        <form @submit.prevent="submitForm" class="space-y-6">
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
            <label for="phone" class="block text-sm font-medium mb-2">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="form.phone"
              class="w-full px-4 py-2 border rounded-md bg-background"
            />
          </div>

          <div>
            <label for="type" class="block text-sm font-medium mb-2">Commission Type *</label>
            <select 
              id="type" 
              v-model="form.type"
              required
              class="w-full px-4 py-2 border rounded-md bg-background"
            >
              <option value="">Select a type...</option>
              <option value="portrait">Portrait</option>
              <option value="nature">Nature & Wildlife</option>
              <option value="cartoon">Watercolor Cartoon</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label for="subject" class="block text-sm font-medium mb-2">Subject Description *</label>
            <textarea 
              id="subject" 
              v-model="form.subject"
              required
              rows="4"
              class="w-full px-4 py-2 border rounded-md bg-background"
            ></textarea>
          </div>

          <div>
            <label for="size" class="block text-sm font-medium mb-2">Desired Size</label>
            <input 
              type="text" 
              id="size" 
              v-model="form.size"
              placeholder="e.g., 11x14 inches"
              class="w-full px-4 py-2 border rounded-md bg-background"
            />
          </div>

          <div>
            <label for="deadline" class="block text-sm font-medium mb-2">Desired Completion Date</label>
            <input 
              type="date" 
              id="deadline" 
              v-model="form.deadline"
              class="w-full px-4 py-2 border rounded-md bg-background"
            />
          </div>

          <div>
            <label for="budget" class="block text-sm font-medium mb-2">Budget Range</label>
            <select 
              id="budget" 
              v-model="form.budget"
              class="w-full px-4 py-2 border rounded-md bg-background"
            >
              <option value="">Select budget...</option>
              <option value="200-500">$200 - $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="2000+">$2,000+</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium mb-2">Additional Information</label>
            <textarea 
              id="message" 
              v-model="form.message"
              rows="5"
              class="w-full px-4 py-2 border rounded-md bg-background"
            ></textarea>
          </div>

          <button 
            type="submit"
            class="w-full rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Submit Commission Request
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Commission Artwork - Robert Gaunce Art',
  description: 'Request custom watercolor commissions from Robert Gaunce. Portraits, nature scenes, wildlife, and cartoons. Serving Paris and Lexington, Kentucky.',
  ogTitle: 'Commission Artwork',
  ogDescription: 'Custom watercolor artwork tailored to your vision. Portraits, nature, wildlife, and cartoon illustrations.',
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  type: '',
  subject: '',
  size: '',
  deadline: '',
  budget: '',
  message: ''
})

const submitForm = async () => {
  // TODO: Connect to backend/email service
  console.log('Commission request:', form.value)
  alert('Thank you for your commission request! Robert will contact you soon.')
}
</script>

