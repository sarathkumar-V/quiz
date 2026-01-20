import express from 'express';
import Quiz from '../models/Quiz.js';

const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single quiz
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new quiz
router.post('/', async (req, res) => {
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    questions: [],
  });

  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a quiz
router.put('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (req.body.title) quiz.title = req.body.title;
    if (req.body.description) quiz.description = req.body.description;
    quiz.updatedAt = new Date();

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a quiz
router.delete('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a question to a quiz
router.post('/:id/questions', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const question = {
      text: req.body.text,
      type: req.body.type,
      options: req.body.options || [],
      correctAnswer: req.body.correctAnswer,
    };

    quiz.questions.push(question);
    quiz.updatedAt = new Date();
    const updatedQuiz = await quiz.save();
    res.status(201).json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a question in a quiz
router.put('/:id/questions/:questionId', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const question = quiz.questions.id(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.text = req.body.text;
    question.type = req.body.type;
    question.options = req.body.options || [];
    question.correctAnswer = req.body.correctAnswer;
    quiz.updatedAt = new Date();

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a question from a quiz
router.delete('/:id/questions/:questionId', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const question = quiz.questions.id(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    quiz.questions.pull(req.params.questionId);
    quiz.updatedAt = new Date();
    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
