"use client"

import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import "./Result.css"

export function Results({ results, isLoading }) {
  if (isLoading) {
    return (
      <div className="results-loading">
        <Loader2 className="loading-icon" />
        <p className="loading-text">Running your code...</p>
      </div>
    )
  }

  if (results.length === 0) {
    return <div className="results-empty">Click "Run Code" to see your results here.</div>
  }

  const passedCount = results.filter((r) => r.passed).length
  const totalCount = results.length

  return (
    <div className="results-container">
      <div className="results-header">
        <h3 className="results-title">Test Results</h3>
        <div className="results-summary">
          <span className={passedCount === totalCount ? "passed-text" : "partial-text"}>
            {passedCount}/{totalCount} passed
          </span>
        </div>
      </div>

      <div className="results-list">
        {results.map((result, index) => (
          <div key={index} className="result-card">
            <div className="result-entry">
              {result.passed ? (
                <CheckCircle className="result-icon passed-icon" />
              ) : (
                <XCircle className="result-icon failed-icon" />
              )}

              <div className="result-content">
                <h4 className="result-case-title">Test Case {index + 1}</h4>

                <div className="result-data-grid">
                  <div>
                    <p className="result-label">Input:</p>
                    <pre className="result-pre">{result.input}</pre>
                  </div>

                  <div>
                    <p className="result-label">Expected Output:</p>
                    <pre className="result-pre">{result.expectedOutput}</pre>
                  </div>
                </div>

                <div className="result-output">
                  <p className="result-label">Your Output:</p>
                  <pre className={`result-pre ${result.passed ? "output-passed" : "output-failed"}`}>
                    {result.actualOutput}
                  </pre>
                </div>

                {!result.passed && result.error && (
                  <div className="result-error">
                    <p className="error-label">Error:</p>
                    <pre className="error-pre">{result.error}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
