import mongoose from 'mongoose';
import Quiz from './models/Quiz.js';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const sampleQuizzes = [
  {
    title: 'General Knowledge',
    description: 'Test your knowledge on various topics',
    questions: [
      {
        text: 'What is the capital of France?',
        type: 'multiple-choice',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
      },
      {
        text: 'Is Python a type of snake?',
        type: 'true-false',
        options: [],
        correctAnswer: 'true',
      },
      {
        text: 'What year did World War II end?',
        type: 'short-answer',
        options: [],
        correctAnswer: '1945',
      },
    ],
  },
  {
    title: 'JavaScript Basics',
    description: 'Fundamental concepts of JavaScript',
    questions: [
      {
        text: 'Which keyword declares a variable in JavaScript?',
        type: 'multiple-choice',
        options: ['var', 'let', 'const', 'All of the above'],
        correctAnswer: 'All of the above',
      },
      {
        text: 'Is JavaScript case-sensitive?',
        type: 'true-false',
        options: [],
        correctAnswer: 'true',
      },
    ],
  },
  {
    title: 'Biology',
    description: 'Basic biology questions',
    questions: [
      {
        text: 'How many chambers does a human heart have?',
        type: 'multiple-choice',
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
      },
      {
        text: 'What is the smallest unit of life?',
        type: 'short-answer',
        options: [],
        correctAnswer: 'cell',
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing quizzes
    await Quiz.deleteMany({});
    console.log('Cleared existing quizzes');

    // Insert sample quizzes
    const createdQuizzes = await Quiz.insertMany(sampleQuizzes);
    console.log(`Created ${createdQuizzes.length} sample quizzes`);

    // Display created quizzes
    createdQuizzes.forEach((quiz, index) => {
      console.log(`\n${index + 1}. ${quiz.title}`);
      console.log(`   Questions: ${quiz.questions.length}`);
      quiz.questions.forEach((q, qIndex) => {
        console.log(`   Q${qIndex + 1}: ${q.text}`);
      });
    });

    console.log('\n✓ Database seeding completed successfully!');
    // eslint-disable-next-line no-undef
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

seedDatabase();
