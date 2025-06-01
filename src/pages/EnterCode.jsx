import React, { useState } from 'react';
import './CodeQuestEntry.css';
import { useNavigate } from 'react-router-dom';
const CodeQuestEntry = () => {
  const navigate = useNavigate();
  const [testCode, setTestCode] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('STUDENT');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setTestCode(value);
    setError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!testCode.trim()) {
      setError('Please enter a test code');
      return;
    }

    if (testCode.length < 4) {
      setError('Test code must be at least 4 characters');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8083/aptitude/${testCode}`);
      if (!response.ok) {
        throw new Error('Invalid test code or server error');
      }
      const data = await response.json();
      if (!data || data.length === 0) {
        setIsLoading(false);
        setError('No questions found for this test code');
        return;
      }
      setIsLoading(false);
      navigate("/aptitude", { state: { questions: data } });
    } catch (err) {
      setIsLoading(false);
      setError('Invalid test code or unable to fetch questions');
    }
  };

  return (
    <div className="cq-bg">
      <div className="cq-center-card">
        <div className="cq-card-header">
          <div className="cq-logo">🚀 CodeQuest</div>
          <h2>Enter Your Test Code</h2>
          <p className="cq-subtitle">Begin your aptitude assessment below</p>
        </div>
        <form className="cq-form" onSubmit={handleSubmit}>
          <div className="cq-input-group">
            <label htmlFor="testCode" className="cq-label">Test Code</label>
            <input
              type="text"
              id="testCode"
              value={testCode}
              onChange={handleCodeChange}
              placeholder="e.g. ABCD1234"
              className={`cq-input ${error ? 'error' : ''}`}
              maxLength={8}
              disabled={isLoading}
              autoFocus
            />
            {error && <div className="cq-error">{error}</div>}
          </div>
          <button
            type="submit"
            className="cq-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="cq-spinner"></span> Verifying...
              </>
            ) : (
              'Start Test'
            )}
          </button>
        </form>
        <div className="cq-instructions">
          <h4>Instructions</h4>
          <ul>
            <li>Enter the test code provided by your instructor.</li>
            <li>Select your user type.</li>
            <li>Click "Start Test" to begin.</li>
            <li>Do not refresh the page during the test.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodeQuestEntry;