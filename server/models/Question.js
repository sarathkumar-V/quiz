import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'short-answer', 'true-false'],
    default: 'multiple-choice',
    required: true,
  },
  options: [String],
  correctAnswer: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default questionSchema;
