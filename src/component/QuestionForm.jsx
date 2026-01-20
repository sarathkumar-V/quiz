import React, { useState } from 'react';

const QuestionForm = ({ question, onSave, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    if (question) {
      return {
        text: question.text,
        type: question.type,
        options: question.options || [],
        correctAnswer: question.correctAnswer || '',
      };
    }
    return {
      text: '',
      type: 'multiple-choice',
      options: [],
      correctAnswer: '',
    };
  });

  const [currentOption, setCurrentOption] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOption = () => {
    if (currentOption.trim()) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, currentOption],
      }));
      setCurrentOption('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      alert('Please enter a question');
      return;
    }
    if (formData.type === 'multiple-choice' && formData.options.length === 0) {
      alert('Please add at least one option for multiple choice questions');
      return;
    }
    if (formData.type === 'multiple-choice' && !formData.correctAnswer) {
      alert('Please select a correct answer for multiple choice questions');
      return;
    }
    onSave({
      text: formData.text,
      type: formData.type,
      options: formData.type === 'multiple-choice' ? formData.options : [],
      correctAnswer: formData.correctAnswer,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {question ? 'Edit Question' : 'Add New Question'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Question Text *</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Enter question"
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Question Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="short-answer">Short Answer</option>
            <option value="true-false">True/False</option>
          </select>
        </div>

        {formData.type === 'multiple-choice' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Options</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentOption}
                onChange={(e) => setCurrentOption(e.target.value)}
                placeholder="Enter option"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddOption())}
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                Add
              </button>
            </div>
            {formData.options.length > 0 && (
              <div className="space-y-2">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="correctAnswer"
                        value={option}
                        checked={formData.correctAnswer === option}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          correctAnswer: e.target.value
                        }))}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor={`option-${index}`} className="text-gray-800 cursor-pointer flex-1">
                        {option}
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newOptions = formData.options.filter((_, i) => i !== index);
                        setFormData(prev => ({
                          ...prev,
                          options: newOptions,
                          correctAnswer: formData.correctAnswer === option ? '' : formData.correctAnswer
                        }));
                      }}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {formData.type === 'multiple-choice' && formData.options.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Correct Answer</label>
            <select
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select correct answer</option>
              {formData.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.type === 'true-false' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Correct Answer</label>
            <select
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select correct answer</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        )}

        {formData.type === 'short-answer' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Correct Answer</label>
            <input
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              placeholder="Enter correct answer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-200"
          >
            {question ? 'Update Question' : 'Add Question'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
