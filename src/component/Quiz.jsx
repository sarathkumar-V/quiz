import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizTable from './QuizTable';
import QuizForm from './QuizForm';
import QuestionForm from './QuestionForm';

const API_URL = 'http://localhost:5000/api/quizzes';

export const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all quizzes
  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      setQuizzes(response.data);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
      setError('Failed to fetch quizzes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Handle quiz creation/update
  const handleSaveQuiz = async (quizData) => {
    try {
      if (editingQuiz) {
        const response = await axios.put(`${API_URL}/${editingQuiz._id}`, quizData);
        setQuizzes(quizzes.map(q => q._id === editingQuiz._id ? response.data : q));
        setEditingQuiz(null);
      } else {
        const response = await axios.post(API_URL, quizData);
        setQuizzes([...quizzes, response.data]);
      }
      setShowQuizForm(false);
    } catch (err) {
      console.error('Error saving quiz:', err);
      setError('Failed to save quiz');
    }
  };

  // Handle quiz deletion
  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await axios.delete(`${API_URL}/${quizId}`);
        setQuizzes(quizzes.filter(q => q._id !== quizId));
        if (expandedQuiz?._id === quizId) {
          setExpandedQuiz(null);
        }
      } catch (err) {
        console.error('Error deleting quiz:', err);
        setError('Failed to delete quiz');
      }
    }
  };

  // Handle question creation/update
  const handleSaveQuestion = async (questionData) => {
    try {
      if (editingQuestion) {
        const response = await axios.put(
          `${API_URL}/${expandedQuiz._id}/questions/${editingQuestion._id}`,
          questionData
        );
        const updatedQuizzes = quizzes.map(q => 
          q._id === expandedQuiz._id ? response.data : q
        );
        setQuizzes(updatedQuizzes);
        setExpandedQuiz(response.data);
        setEditingQuestion(null);
      } else {
        const response = await axios.post(
          `${API_URL}/${expandedQuiz._id}/questions`,
          questionData
        );
        const updatedQuizzes = quizzes.map(q => 
          q._id === expandedQuiz._id ? response.data : q
        );
        setQuizzes(updatedQuizzes);
        setExpandedQuiz(response.data);
      }
      setShowQuestionForm(false);
    } catch (err) {
      console.error('Error saving question:', err);
      setError('Failed to save question');
    }
  };

  // Handle question deletion
  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        const response = await axios.delete(
          `${API_URL}/${expandedQuiz._id}/questions/${questionId}`
        );
        const updatedQuizzes = quizzes.map(q => 
          q._id === expandedQuiz._id ? response.data : q
        );
        setQuizzes(updatedQuizzes);
        setExpandedQuiz(response.data);
      } catch (err) {
        console.error('Error deleting question:', err);
        setError('Failed to delete question');
      }
    }
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setShowQuizForm(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  const handleExpandQuiz = (quiz) => {
    setExpandedQuiz(expandedQuiz?._id === quiz._id ? null : quiz);
    setShowQuestionForm(false);
    setEditingQuestion(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Quiz Manager</h1>
          <button
            onClick={() => {
              setEditingQuiz(null);
              setShowQuizForm(!showQuizForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            {showQuizForm ? 'Cancel' : '+ New Quiz'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}

        {showQuizForm && (
          <QuizForm
            quiz={editingQuiz}
            onSave={handleSaveQuiz}
            onCancel={() => {
              setShowQuizForm(false);
              setEditingQuiz(null);
            }}
          />
        )}

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading quizzes...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">No quizzes yet. Create one to get started!</p>
          </div>
        ) : (
          <QuizTable
            quizzes={quizzes}
            expandedQuiz={expandedQuiz}
            onExpand={handleExpandQuiz}
            onEdit={handleEditQuiz}
            onDelete={handleDeleteQuiz}
            onAddQuestion={() => {
              setEditingQuestion(null);
              setShowQuestionForm(true);
            }}
            onEditQuestion={handleEditQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            showQuestionForm={showQuestionForm}
            editingQuestion={editingQuestion}
            onSaveQuestion={handleSaveQuestion}
            onCancelQuestion={() => {
              setShowQuestionForm(false);
              setEditingQuestion(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
