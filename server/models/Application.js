const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, default: '' },
  location: { type: String, default: '' },
  jobDescription: { type: String, default: '' },
  resumeText: { type: String, default: '' },
  matchScore: { type: Number, default: 0 },
  analysis: { type: mongoose.Schema.Types.Mixed, default: {} },
  interviewHistory: [{ role: String, content: String, timestamp: Date }],
  evaluation: { type: mongoose.Schema.Types.Mixed, default: null },
  targetKeywords: [String],
  cultureType: { type: String, default: 'Corporate' },
  sector: { type: String, default: 'General' },
}, { timestamps: true });

module.exports = mongoose.models.Application || mongoose.model('Application', applicationSchema);
