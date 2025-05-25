import { useState } from "react";
import { Trash2 } from "lucide-react";
import "./TestCases.css"; // Link to your external CSS

export function TestCases({ testCases, onUpdate, onRemove }) {
  const [expandedCase, setExpandedCase] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  return (
    <div className="test-cases-container">
      {testCases.map((testCase) => (
        <div
          key={testCase.id}
          className={`test-case-card ${expandedCase === testCase.id ? "expanded" : ""}`}
          onClick={() => toggleExpand(testCase.id)}
        >
          <div className="test-case-header">
            <h4 className="test-case-title">Test Case {testCase.id.replace("tc-", "")}</h4>
            <button
              className="icon-button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(testCase.id);
              }}
            >
              <Trash2 className="trash-icon" />
            </button>
          </div>

          {expandedCase === testCase.id && (
            <div className="test-case-body" onClick={(e) => e.stopPropagation()}>
              <div>
                <label className="label">Input</label>
                <textarea
                  value={testCase.input}
                  onChange={(e) => onUpdate(testCase.id, "input", e.target.value)}
                  placeholder="Enter input values"
                  className="textarea"
                />
              </div>

              <div>
                <label className="label">Expected Output</label>
                <textarea
                  value={testCase.expectedOutput}
                  onChange={(e) => onUpdate(testCase.id, "expectedOutput", e.target.value)}
                  placeholder="Enter expected output"
                  className="textarea"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {testCases.length === 0 && (
        <div className="empty-message">
          No test cases added yet. Click "Add Test Case" to create one.
        </div>
      )}
    </div>
  );
}
