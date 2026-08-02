<template>
  <div class="h-screen bg-background flex flex-col font-inter">
    <!-- Header -->
    <header class="bg-surface-container-lowest border-b border-outline-variant py-4 px-6 flex items-center justify-between shrink-0">
      <div class="flex items-center gap-3">
        <h1 class="text-xl font-semibold font-plus-jakarta text-on-surface">Canlı Mülakat Simülasyonu</h1>
        <div class="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium border border-green-200">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          IK Uzmanı Bağlı
        </div>
      </div>
      <button 
        @click="endSimulationEarly" 
        class="text-error hover:bg-error/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
      >
        Mülakatı Sonlandır
      </button>
    </header>

    <!-- Info Banner -->
    <div class="bg-blue-50 border-b border-blue-100 py-3 px-6 shrink-0 flex items-center gap-2 text-blue-700 text-sm">
      <span class="material-symbols-outlined text-lg">info</span>
      Mülakat başlatıldı. Cevaplarınız STAR metodolojisine göre değerlendirilecektir.
    </div>

    <!-- Chat Area -->
    <div class="flex-1 overflow-y-auto p-6 space-y-6" ref="chatContainer">
      
      <!-- Loading State for Start -->
      <div v-if="isLoading && messages.length === 0" class="flex justify-center py-8">
        <div class="flex flex-col items-center gap-3 text-on-surface-variant">
          <span class="material-symbols-outlined animate-spin text-3xl">sync</span>
          <p>Mülakat soruları hazırlanıyor...</p>
        </div>
      </div>

      <div 
        v-for="(msg, index) in messages" 
        :key="index"
        class="flex gap-4 max-w-3xl"
        :class="msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''"
      >
        <!-- Avatar -->
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm"
          :class="msg.role === 'user' ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary'"
        >
          <span class="material-symbols-outlined text-xl">
            {{ msg.role === 'user' ? 'person' : 'psychology' }}
          </span>
        </div>

        <!-- Message Bubble -->
        <div 
          class="px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap"
          :class="[
            msg.role === 'user' 
              ? 'bg-primary text-on-primary rounded-tr-sm' 
              : 'bg-surface-container-lowest border border-outline-variant text-on-surface rounded-tl-sm shadow-sm'
          ]"
        >
          {{ msg.content }}
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="flex gap-4 max-w-3xl">
        <div class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
          <span class="material-symbols-outlined text-xl">psychology</span>
        </div>
        <div class="px-5 py-4 rounded-2xl bg-surface-container-lowest border border-outline-variant rounded-tl-sm flex items-center gap-1.5 shadow-sm">
          <span class="w-2 h-2 bg-on-surface-variant/60 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
          <span class="w-2 h-2 bg-on-surface-variant/60 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
          <span class="w-2 h-2 bg-on-surface-variant/60 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
        </div>
      </div>

    </div>

    <!-- Input Area -->
    <div class="bg-surface-container-lowest border-t border-outline-variant p-4 shrink-0">
      <div class="max-w-4xl mx-auto space-y-3">
        
        <div class="flex items-center justify-between px-1">
          <div class="flex items-center gap-1.5 text-xs font-medium text-primary">
            <span class="material-symbols-outlined text-sm">tips_and_updates</span>
            Hatırlatma: STAR (Situation, Task, Action, Result)
          </div>
          <div class="text-xs font-medium text-on-surface-variant" v-if="questions.length > 0">
            Soru {{ currentQuestionIndex + 1 }} / {{ questions.length }}
          </div>
        </div>

        <form @submit.prevent="submitAnswer" class="flex gap-3 items-end">
          <textarea
            v-model="currentAnswer"
            :disabled="isLoading || isTyping || isEvaluating"
            rows="3"
            placeholder="Cevabınızı buraya yazın..."
            class="flex-1 p-3.5 rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none disabled:opacity-60"
            @keydown.enter.prevent="handleEnter"
          ></textarea>
          
          <button 
            type="submit"
            :disabled="!currentAnswer.trim() || isLoading || isTyping || isEvaluating"
            class="bg-primary text-on-primary h-12 w-12 rounded-xl flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <span v-if="isEvaluating" class="material-symbols-outlined animate-spin">sync</span>
            <span v-else class="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { interviewService } from '../services/api'

const router = useRouter()
const chatContainer = ref(null)

const setupData = ref(null)
const questions = ref([])
const currentQuestionIndex = ref(0)
const answers = ref([])
const messages = ref([])

const currentAnswer = ref('')
const isLoading = ref(true)
const isTyping = ref(false)
const isEvaluating = ref(false)

onMounted(async () => {
  const stored = sessionStorage.getItem('interviewSetup')
  if (!stored) {
    router.replace('/')
    return
  }
  
  setupData.value = JSON.parse(stored)
  
  try {
    const data = await interviewService.startInterview(setupData.value)
    questions.value = data.questions || []
    
    if (questions.value.length > 0) {
      isTyping.value = true
      isLoading.value = false
      setTimeout(() => {
        messages.value.push({ role: 'ai', content: questions.value[0] })
        isTyping.value = false
        scrollToBottom()
      }, 1000)
    }
  } catch (err) {
    console.error('Failed to start interview:', err)
    alert('Mülakat başlatılamadı. Lütfen tekrar deneyin.')
    router.replace('/')
  }
})

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const handleEnter = (e) => {
  if (!e.shiftKey) {
    submitAnswer()
  }
}

const submitAnswer = async () => {
  const answer = currentAnswer.value.trim()
  if (!answer || isLoading.value || isTyping.value || isEvaluating.value) return

  // Add user message
  messages.value.push({ role: 'user', content: answer })
  answers.value.push(answer)
  currentAnswer.value = ''
  scrollToBottom()

  if (currentQuestionIndex.value < questions.value.length - 1) {
    // Next question
    currentQuestionIndex.value++
    isTyping.value = true
    scrollToBottom()
    
    // Simulate thinking delay
    setTimeout(() => {
      messages.value.push({ role: 'ai', content: questions.value[currentQuestionIndex.value] })
      isTyping.value = false
      scrollToBottom()
    }, 1500)
  } else {
    // Evaluation
    await finishAndEvaluate()
  }
}

const finishAndEvaluate = async () => {
  isEvaluating.value = true
  isTyping.value = true
  scrollToBottom()

  try {
    const evaluationData = await interviewService.evaluateInterview({
      position: setupData.value.position,
      questions: questions.value,
      answers: answers.value,
      experienceLevel: setupData.value.experienceLevel
    })

    sessionStorage.setItem('interviewEvaluation', JSON.stringify(evaluationData))
    router.push('/report')
  } catch (err) {
    console.error('Evaluation failed:', err)
    alert('Değerlendirme sırasında bir hata oluştu.')
    isEvaluating.value = false
    isTyping.value = false
  }
}

const endSimulationEarly = () => {
  if(confirm('Mülakatı erken sonlandırmak istediğinize emin misiniz?')) {
    router.push('/')
  }
}
</script>
