<template>
  <div class="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-inter">
    <div class="max-w-2xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="text-center space-y-2">
        <h1 class="text-4xl font-bold font-plus-jakarta text-primary">CareerAI</h1>
        <p class="text-lg text-on-surface-variant">Yapay Zeka Destekli Mülakat Simülasyonu</p>
      </div>

      <!-- Main Card -->
      <div class="bg-surface-container-lowest shadow-level-1 rounded-xl border border-outline-variant p-8 space-y-6">
        <div class="space-y-1">
          <h2 class="text-2xl font-semibold font-plus-jakarta text-on-surface">Mülakatınızı Kişiselleştirin</h2>
          <p class="text-on-surface-variant text-sm">Size en uygun mülakat deneyimini sunabilmemiz için aşağıdaki bilgileri doldurun.</p>
        </div>

        <form @submit.prevent="startSimulation" class="space-y-5">
          <!-- Position -->
          <div class="space-y-2">
            <label for="position" class="block text-sm font-medium text-on-surface">Başvurduğunuz Pozisyon</label>
            <input 
              type="text" 
              id="position" 
              v-model="formData.position" 
              required
              placeholder="Örn: Frontend Developer"
              class="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
          </div>

          <!-- Experience Level -->
          <div class="space-y-2">
            <label for="experience" class="block text-sm font-medium text-on-surface">Deneyim Seviyeniz</label>
            <select 
              id="experience" 
              v-model="formData.experienceLevel"
              required
              class="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
            >
              <option value="" disabled>Seçiniz</option>
              <option value="Junior">Junior (0-2 yıl)</option>
              <option value="Mid-Level">Mid-Level (2-5 yıl)</option>
              <option value="Senior">Senior (5-10 yıl)</option>
              <option value="Lead/Principal">Lead/Principal (10+ yıl)</option>
            </select>
          </div>

          <!-- CV Text -->
          <div class="space-y-2">
            <label for="cv" class="block text-sm font-medium text-on-surface">CV / Özgeçmiş Metniniz</label>
            <textarea 
              id="cv" 
              v-model="formData.cvText"
              required
              rows="4"
              placeholder="Deneyimlerinizi, yeteneklerinizi ve eğitiminizi buraya yapıştırın..."
              class="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-y"
            ></textarea>
          </div>

          <!-- Job Posting -->
          <div class="space-y-2">
            <label for="jobPosting" class="block text-sm font-medium text-on-surface">İş İlanı Metni</label>
            <textarea 
              id="jobPosting" 
              v-model="formData.jobPosting"
              required
              rows="4"
              placeholder="Başvurduğunuz iş ilanının detaylarını buraya yapıştırın..."
              class="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-y"
            ></textarea>
          </div>

          <!-- Submit -->
          <div class="pt-4">
            <button 
              type="submit" 
              class="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
            >
              <span>Mülakat Simülasyonunu Başlat</span>
              <span class="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  position: '',
  experienceLevel: '',
  cvText: '',
  jobPosting: ''
})

const startSimulation = () => {
  if (!formData.value.position || !formData.value.experienceLevel || !formData.value.cvText || !formData.value.jobPosting) return

  // Store in sessionStorage
  sessionStorage.setItem('interviewSetup', JSON.stringify(formData.value))
  
  router.push('/interview')
}
</script>
