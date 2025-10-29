<template>
  <div class="container mx-auto px-4 py-12">
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        Explore Robert's watercolor artwork
      </p>
    </header>

    <!-- Filter Tabs -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button 
        @click="selectedCategory = 'all'"
        :class="selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'"
        class="px-6 py-2 rounded-md transition-colors"
      >
        All Work
      </button>
      <button 
        @click="selectedCategory = 'nature'"
        :class="selectedCategory === 'nature' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'"
        class="px-6 py-2 rounded-md transition-colors"
      >
        Nature
      </button>
      <button 
        @click="selectedCategory = 'portraits'"
        :class="selectedCategory === 'portraits' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'"
        class="px-6 py-2 rounded-md transition-colors"
      >
        Pet Portraits
      </button>
      <button 
        @click="selectedCategory = 'commissions'"
        :class="selectedCategory === 'commissions' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'"
        class="px-6 py-2 rounded-md transition-colors"
      >
        Commissions
      </button>
    </div>

    <!-- Portfolio Bento Box Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4">
      <!-- Large featured pieces -->
      <div 
        v-for="(image, idx) in portfolioImages.slice(0, 22)"
        :key="idx"
        :class="getBentoClass(idx)"
        class="group relative overflow-hidden rounded-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
        @click="selectedArtwork = idx"
      >
        <img 
          :src="`/Portfolio Page/${image}`" 
          :alt="`Robert Gaunce Artwork ${idx + 1}`"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
          <span class="text-white font-medium">View Artwork</span>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="selectedArtwork !== null" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" @click="selectedArtwork = null">
      <div class="relative max-w-6xl w-full" @click.stop>
        <button 
          @click="selectedArtwork = null" 
          class="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img 
          :src="`/Portfolio Page/${portfolioImages[selectedArtwork]}`" 
          :alt="`Robert Gaunce Artwork ${selectedArtwork + 1}`"
          class="w-full h-auto max-h-[90vh] object-contain rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Portfolio - Robert Gaunce Art',
  description: 'View Robert Gaunce\'s watercolor artwork portfolio. Nature, wildlife, portraits, and commissioned works.',
  ogTitle: 'Portfolio - Robert Gaunce Art',
  ogDescription: 'Explore watercolor artwork by Robert Gaunce.',
})

const selectedCategory = ref('all')
const selectedArtwork = ref<number | null>(null)

// Portfolio images from public/Portfolio Page folder
const portfolioImages = [
  '480856802_1245978560375933_7207263953749569228_n.jpg',
  '480886079_1245978563709266_2196877513181326206_n.jpg',
  '481273044_1245978527042603_4096098734284691827_n.jpg',
  '482121021_18497611459005382_1452853370459587419_n.jpg',
  '482213605_1251612636479192_4312016029439314639_n.jpg',
  '484513890_1260977892209333_3753501684828795924_n.jpg',
  '484556969_1260977855542670_8768746875172816430_n.jpg',
  '484807978_1262982692008853_7272930512062650294_n.jpg',
  '484850519_1262982532008869_7370663112742817531_n.jpg',
  '484903606_1260978002209322_7562977234246834090_n.jpg',
  '484955541_1262982652008857_7542519861831190573_n.jpg',
  '484986084_1260978022209320_4550612825841821344_n.jpg',
  '485113089_1262982655342190_5867458585541286007_n.jpg',
  '485678901_1262982628675526_8224146836461254573_n.jpg',
  '485801710_1262982622008860_16962771400210963_n.jpg',
  '489989352_1285179086455880_8269369372494881721_n.jpg',
  '490239101_1285179089789213_8846289807534566890_n.jpg',
  '527260027_18528809347005382_5841035294417621184_n.jpg',
  '527320078_18528809536005382_2167619236943960232_n.jpg',
  '527478563_18528809527005382_5532262821194536752_n.jpg',
  '534556354_18531480934005382_7496837894018459529_n.jpg',
  '535921160_18531480919005382_7350609248684353540_n.jpg'
]

// Bento box layout classes - creates varied grid spans for visual interest
const getBentoClass = (index: number) => {
  const patterns = [
    'col-span-2 row-span-2', // large
    'col-span-1 row-span-1', // small
    'col-span-1 row-span-2', // tall
    'col-span-2 row-span-1', // wide
    'col-span-1 row-span-1', // small
    'col-span-1 row-span-1', // small
    'col-span-2 row-span-2', // large
    'col-span-1 row-span-1', // small
    'col-span-1 row-span-2', // tall
    'col-span-1 row-span-1', // small
    'col-span-2 row-span-1', // wide
    'col-span-1 row-span-1', // small
    'col-span-1 row-span-2', // tall
    'col-span-2 row-span-1', // wide
    'col-span-1 row-span-1', // small
    'col-span-2 row-span-2', // large
    'col-span-1 row-span-1', // small
    'col-span-1 row-span-1', // small
    'col-span-1 row-span-2', // tall
    'col-span-2 row-span-1', // wide
    'col-span-1 row-span-1', // small
    'col-span-1 row-span-1', // small
  ]
  return patterns[index % patterns.length]
}
</script>

