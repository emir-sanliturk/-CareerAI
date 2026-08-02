const API_BASE = '/api'

export const api = {
  async startInterview({ position, experienceLevel, cvText, jobPosting }) {
    try {
      const response = await fetch(`${API_BASE}/interview/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ position, experienceLevel, cvText, jobPosting })
      })
      if (!response.ok) throw new Error('Failed to start interview')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },

  async evaluateInterview({ position, questions, answers, experienceLevel }) {
    try {
      const response = await fetch(`${API_BASE}/interview/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ position, questions, answers, experienceLevel })
      })
      if (!response.ok) throw new Error('Failed to evaluate interview')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
}
