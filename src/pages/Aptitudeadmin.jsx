import React, { useState } from 'react';
import './Aptitudeadmin.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('ADMIN');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleQuestionChange = (value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      question: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleCorrectAnswerChange = (value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      correctAnswer: value
    }));
  };

  const addQuestion = () => {
    if (currentQuestion.question.trim() === '' || 
        currentQuestion.options.some(opt => opt.trim() === '') || 
        currentQuestion.correctAnswer.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    if (editingIndex >= 0) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = { ...currentQuestion };
      setQuestions(updatedQuestions);
      setEditingIndex(-1);
    } else {
      setQuestions(prev => [...prev, { ...currentQuestion }]);
    }

    setCurrentQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    });
  };

  const editQuestion = (index) => {
    setCurrentQuestion({ ...questions[index] });
    setEditingIndex(index);
  };

  const deleteQuestion = (index) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const cancelEdit = () => {
    setCurrentQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    });
    setEditingIndex(-1);
  };

  const exportQuestions = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'aptitude_questions.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="admin-container">
      {/* Navbar */}
      <div className="admin-navbar">
        <div className="admin-logo">
          APTITUDE TEST
        </div>
        <div className="admin-nav-menu">
          <span className="admin-nav-active">Admin Panel</span>
        </div>
        <div className="admin-user-icon">
          👤
        </div>
      </div>

      <div className="admin-main-content">
        {/* Hero Section */}
        <div className="admin-hero">
          <div className="admin-tabs-container">
            <div 
              className={`admin-tab ${activeTab === 'STUDENT' ? 'admin-tab-active' : ''}`}
              onClick={() => setActiveTab('STUDENT')}
            >
              STUDENT
            </div>
            <div 
              className={`admin-tab ${activeTab === 'ADMIN' ? 'admin-tab-active' : ''}`}
              onClick={() => setActiveTab('ADMIN')}
            >
              ADMIN
            </div>
          </div>

          <div className="admin-info-bar">
            <div className="admin-code-box">
              ADMIN PANEL
            </div>
            <div className="admin-timer-box">
              Total Questions: {questions.length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-content-wrapper">
          {/* Question Form */}
          <div className="admin-form-container">
            <div className="admin-form-header">
              {editingIndex >= 0 ? 'Edit Question' : 'Add New Question'}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                Question:
              </label>
              <textarea
                value={currentQuestion.question}
                onChange={(e) => handleQuestionChange(e.target.value)}
                className="admin-question-textarea"
                placeholder="Enter your question here..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                Options:
              </label>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="admin-option-row">
                  <span className="admin-option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="admin-option-input"
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  />
                </div>
              ))}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                Correct Answer:
              </label>
              <select
                value={currentQuestion.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(e.target.value)}
                className="admin-select"
              >
                <option value="">Select correct answer</option>
                {currentQuestion.options.map((option, index) => (
                  option.trim() && (
                    <option key={index} value={option}>
                      {String.fromCharCode(65 + index)}: {option}
                    </option>
                  )
                ))}
              </select>
            </div>

            <div className="admin-button-group">
              <button
                onClick={addQuestion}
                className="admin-btn admin-btn-primary"
              >
                {editingIndex >= 0 ? 'Update Question' : 'Add Question'}
              </button>
              {editingIndex >= 0 && (
                <button
                  onClick={cancelEdit}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Questions List */}
          <div className="admin-questions-container">
            <div className="admin-questions-header">
              <span>Questions List ({questions.length})</span>
              {questions.length > 0 && (
                <button
                  onClick={exportQuestions}
                  className="admin-export-btn"
                >
                  Export
                </button>
              )}
            </div>

            {questions.length === 0 ? (
              <div className="admin-empty-state">
                No questions added yet. Add your first question using the form on the left.
              </div>
            ) : (
              questions.map((q, index) => (
                <div 
                  key={index} 
                  className={`admin-question-card ${editingIndex === index ? 'admin-question-card-editing' : ''}`}
                >
                  <div className="admin-question-title">
                    Q{index + 1}: {q.question.length > 60 ? q.question.substring(0, 60) + '...' : q.question}
                  </div>
                  <div className="admin-question-meta">
                    Correct Answer: {q.correctAnswer}
                  </div>
                  <div className="admin-question-actions">
                    <button
                      onClick={() => editQuestion(index)}
                      className="admin-btn-small admin-btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteQuestion(index)}
                      className="admin-btn-small admin-btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;