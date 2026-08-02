<template>
  <div class="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8 font-inter">
    <div class="max-w-5xl mx-auto space-y-6">
      
      <!-- Header Actions -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold font-plus-jakarta text-primary">Mülakat Performans Karnesi</h1>
          <p class="text-on-surface-variant mt-1">Simülasyon sonuçlarınız ve geri bildirimler</p>
        </div>
        <div class="flex gap-3">
          <button 
            @click="downloadPDF" 
            class="flex items-center gap-2 px-4 py-2 bg-surface text-on-surface border border-outline-variant rounded-lg hover:bg-surface-container-lowest transition-colors font-medium shadow-sm"
          >
            <span class="material-symbols-outlined">download</span>
            PDF İndir
          </button>
          <button 
            @click="startNewSimulation" 
            class="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm"
          >
            <span class="material-symbols-outlined">add</span>
            Yeni Simülasyon
          </button>
        </div>
      </div>

      <!-- Report Container (For PDF Export) -->
      <div ref="reportContainer" class="bg-surface-container-lowest shadow-level-1 rounded-2xl border border-outline-variant/30 overflow-hidden" v-if="evaluation">
        
        <div class="p-8 space-y-10">
          
          <!-- Top Section (Summary & Score) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-4">
              <h2 class="text-xl font-semibold font-plus-jakarta text-on-surface flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">analytics</span>
                Yönetici Özeti
              </h2>
              <div class="p-5 bg-surface rounded-xl border border-outline-variant text-on-surface leading-relaxed whitespace-pre-line">
                {{ evaluation.summary || 'Özet bilgi bulunamadı.' }}
              </div>
            </div>
            
            <div class="flex flex-col items-center justify-center p-6 bg-surface rounded-xl border border-outline-variant">
              <h3 class="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-4">Genel Skor</h3>
              <div class="relative w-36 h-36">
                <svg viewBox="0 0 100 100" class="w-full h-full" style="transform: rotate(-90deg)">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#F1F5F9" stroke-width="10"/>
                  <circle cx="50" cy="50" r="45" fill="none" :stroke="scoreColor" stroke-width="10"
                    stroke-dasharray="283" :stroke-dashoffset="283 - (283 * evaluation.overallScore / 100)"
                    stroke-linecap="round" style="transition: stroke-dashoffset 1s ease-in-out"/>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-4xl font-bold font-plus-jakarta" :class="textColorClass">{{ evaluation.overallScore }}</span>
                  <span class="text-xs font-medium text-on-surface-variant">/ 100</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Performance Metrics -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold font-plus-jakarta text-on-surface flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">tune</span>
              Performans Metrikleri
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <!-- Metric 1 -->
              <div class="space-y-2">
                <div class="flex justify-between items-end">
                  <span class="font-medium text-sm text-on-surface">STAR Metodolojisi</span>
                  <span class="text-sm font-bold text-primary">{{ evaluation.metrics.starMethod }}%</span>
                </div>
                <div class="h-2.5 w-full bg-secondary-container rounded-full overflow-hidden">
                  <div class="h-full bg-primary rounded-full transition-all duration-1000" :style="{ width: `${evaluation.metrics.starMethod}%` }"></div>
                </div>
              </div>

              <!-- Metric 2 -->
              <div class="space-y-2">
                <div class="flex justify-between items-end">
                  <span class="font-medium text-sm text-on-surface">İletişim & İfade</span>
                  <span class="text-sm font-bold text-primary">{{ evaluation.metrics.communication }}%</span>
                </div>
                <div class="h-2.5 w-full bg-secondary-container rounded-full overflow-hidden">
                  <div class="h-full bg-primary rounded-full transition-all duration-1000" :style="{ width: `${evaluation.metrics.communication}%` }"></div>
                </div>
              </div>

              <!-- Metric 3 -->
              <div class="space-y-2">
                <div class="flex justify-between items-end">
                  <span class="font-medium text-sm text-on-surface">Kültürel Uyum</span>
                  <span class="text-sm font-bold text-primary">{{ evaluation.metrics.cultureFit }}%</span>
                </div>
                <div class="h-2.5 w-full bg-secondary-container rounded-full overflow-hidden">
                  <div class="h-full bg-primary rounded-full transition-all duration-1000" :style="{ width: `${evaluation.metrics.cultureFit}%` }"></div>
                </div>
              </div>

            </div>
          </div>

          <!-- Strengths & Improvements -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Strengths -->
            <div class="p-6 bg-surface rounded-xl border border-outline-variant space-y-4">
              <h3 class="font-semibold text-lg flex items-center gap-2 text-on-surface">
                <span class="material-symbols-outlined text-secondary">check_circle</span>
                Güçlü Yönler
              </h3>
              <ul class="space-y-3">
                <li v-for="(strength, idx) in evaluation.strengths" :key="idx" class="flex items-start gap-2 text-sm text-on-surface-variant">
                  <span class="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">done</span>
                  <span>{{ strength }}</span>
                </li>
              </ul>
            </div>

            <!-- Improvements -->
            <div class="p-6 bg-surface rounded-xl border border-outline-variant space-y-4">
              <h3 class="font-semibold text-lg flex items-center gap-2 text-on-surface">
                <span class="material-symbols-outlined text-[#ea580c]">warning</span>
                Gelişim Alanları
              </h3>
              <ul class="space-y-3">
                <li v-for="(improvement, idx) in evaluation.improvements" :key="idx" class="flex items-start gap-2 text-sm text-on-surface-variant">
                  <span class="material-symbols-outlined text-[#ea580c] text-[18px] mt-0.5 shrink-0">priority_high</span>
                  <span>{{ improvement }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Tactical Action Plan -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold font-plus-jakarta text-on-surface flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">flag</span>
              Taktiksel Aksiyon Planı
            </h2>
            <div class="space-y-3">
              <div 
                v-for="(action, idx) in evaluation.actionPlan" 
                :key="idx"
                class="flex gap-4 p-4 bg-surface rounded-xl border border-outline-variant"
              >
                <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold shrink-0">
                  {{ idx + 1 }}
                </div>
                <div class="text-sm text-on-surface pt-1.5 leading-relaxed">
                  {{ action }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <!-- Loading / Fallback -->
      <div v-else class="flex justify-center py-20">
        <div class="flex flex-col items-center gap-4 text-on-surface-variant">
          <span class="material-symbols-outlined animate-spin text-4xl">sync</span>
          <p>Sonuçlar yükleniyor...</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const reportContainer = ref(null)
const evaluation = ref(null)

onMounted(() => {
  const stored = sessionStorage.getItem('interviewEvaluation')
  if (stored) {
    evaluation.value = JSON.parse(stored)
  } else {
    // Mock data for development if accessed directly
    evaluation.value = {
      overallScore: 82,
      summary: "Aday, genel olarak pozitif bir izlenim bırakmış olup, teknik konulardaki yetkinliğini verilen örneklerle desteklemiştir. STAR metodunu kullanımında bazı eksiklikler bulunsa da, iletişim becerileri ve problem çözme yaklaşımı oldukça güçlüdür.",
      metrics: {
        starMethod: 65,
        communication: 90,
        cultureFit: 85
      },
      strengths: [
        "Teknik problemleri açıklarken net ve anlaşılır bir dil kullanımı.",
        "Takım çalışmasına yatkınlık ve geçmiş projelerdeki işbirliği örnekleri.",
        "Baskı altında sakin kalabilme ve çözüm odaklı yaklaşım."
      ],
      improvements: [
        "STAR metodunu kullanırken 'Sonuç' (Result) kısmını daha somut metriklerle ifade etmelisiniz.",
        "Zaman yönetimi konusunda verilen örnekler biraz daha detaylandırılabilir.",
        "Liderlik yetkinliklerini vurgulayan senaryolara daha fazla yer verilmeli."
      ],
      actionPlan: [
        "Geçmiş projelerinizdeki başarılarınızı sayısal metriklerle (örn: %20 performans artışı) not edin.",
        "Davranışsal mülakat soruları için en az 3 farklı 'zorlu durum' senaryosunu STAR formatında hazırlayın.",
        "Mülakat sırasında soruyu yanıtlamaya başlamadan önce 2-3 saniye düşünme payı bırakın."
      ]
    }
  }
})

const scoreColor = computed(() => {
  if (!evaluation.value) return '#10B981'
  const score = evaluation.value.overallScore
  if (score >= 80) return '#10B981' // Green
  if (score >= 60) return '#F59E0B' // Yellow
  return '#EF4444' // Red
})

const textColorClass = computed(() => {
  if (!evaluation.value) return 'text-secondary'
  const score = evaluation.value.overallScore
  if (score >= 80) return 'text-secondary'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-500'
})

const startNewSimulation = () => {
  router.push('/')
}

const downloadPDF = async () => {
  try {
    const html2pdf = (await import('html2pdf.js')).default
    
    const opt = {
      margin: 10,
      filename: 'Mulakat_Performans_Karnesi.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    await html2pdf().set(opt).from(reportContainer.value).save()
  } catch (error) {
    console.error('PDF export failed:', error)
    alert('PDF oluşturulurken bir hata meydana geldi. html2pdf.js paketinin yüklü olduğundan emin olun (npm install html2pdf.js).')
  }
}
</script>
