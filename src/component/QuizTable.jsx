import React from 'react';
import QuestionForm from './QuestionForm';

const QuizTable = ({
  quizzes,
  expandedQuiz,
  onExpand,
  onEdit,
  onDelete,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
  showQuestionForm,
  editingQuestion,
  onSaveQuestion,
  onCancelQuestion,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Questions</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <React.Fragment key={quiz._id}>
              <tr className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-900 font-medium">{quiz.title}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{quiz.description}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
                    {quiz.questions?.length || 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onExpand(quiz)}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded transition duration-200"
                    >
                      {expandedQuiz?._id === quiz._id ? 'Collapse' : 'Expand'}
                    </button>
                    <button
                      onClick={() => onEdit(quiz)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(quiz._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              {expandedQuiz?._id === quiz._id && (
                <tr>
                  <td colSpan="4" className="px-6 py-6 bg-gray-50">
                    <div className="bg-white rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Questions</h3>
                        <button
                          onClick={onAddQuestion}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                        >
                          + Add Question
                        </button>
                      </div>

                      {showQuestionForm && (
                        <div className="mb-6 p-4 border border-blue-300 rounded-lg bg-blue-50">
                          <QuestionForm
                            question={editingQuestion}
                            onSave={onSaveQuestion}
                            onCancel={onCancelQuestion}
                          />
                        </div>
                      )}

                      {quiz.questions && quiz.questions.length > 0 ? (
                        <div className="space-y-3">
                          {quiz.questions.map((question, index) => (
                            <div key={question._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-800">
                                    Q{index + 1}: {question.text}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Type: <span className="font-medium">{question.type}</span>
                                  </p>
                                  {question.type === 'multiple-choice' && question.options && (
                                    <div className="mt-2 ml-4 text-sm text-gray-600">
                                      <p className="font-medium">Options:</p>
                                      <ul className="list-disc ml-4">
                                        {question.options.map((option, idx) => (
                                          <li key={idx}>{option}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <button
                                    onClick={() => onEditQuestion(question)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded transition duration-200"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => onDeleteQuestion(question._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition duration-200"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-center py-4">No questions yet. Add one to get started!</p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizTable;
