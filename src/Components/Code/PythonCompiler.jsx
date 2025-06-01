/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import CodeEditor from "./CodeEditor"
import { TestCases } from "./TestCases.jsx"
import { Results } from "./Result"
import { Console } from "./Console"
import "./pythonCompiler.css"

export function PythonCompiler({ defaultProblem }) {
  const [problem, setProblem] = useState(defaultProblem)
  const [code, setCode] = useState(defaultProblem.starterCode)
  const [testCases, setTestCases] = useState(defaultProblem.testCases)
  const [results, setResults] = useState([])
  const [consoleOutput, setConsoleOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("problem")

  // Updated: Run code using Judge0 backend API
  const handleRunCode = async () => {
    setIsRunning(true)
    setActiveTab("results")
    setConsoleOutput("")
    setResults([])

    const newResults = []
    let allConsoleOutput = ""

    for (const testCase of testCases) {
      try {
        const payload = {
          code: code,
          stdin: testCase.input || null // send null if no input
        }

        const response = await fetch("http://localhost:8083/api/code/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })

        const data = await response.json()
        // Judge0 returns output in data.stdout, errors in data.stderr or data.compile_output
        const actualOutput = data.stdout !== null && data.stdout !== undefined ? data.stdout : ""
        const errorOutput = data.stderr || data.compile_output || data.message || ""
        const passed = actualOutput.trim() === (testCase.expectedOutput || "").trim()

        newResults.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput,
          passed,
          error: errorOutput,
          consoleOutput: actualOutput
        })

        allConsoleOutput += `--- Test Case ${testCase.id} ---\n${actualOutput}${errorOutput ? "\n" + errorOutput : ""}\n\n`
      } catch (error) {
        newResults.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: "",
          passed: false,
          error: error.message,
          consoleOutput: ""
        })
        allConsoleOutput += `--- Test Case ${testCase.id} ---\nERROR: ${error.message}\n\n`
      }
    }

    setResults(newResults)
    setConsoleOutput(allConsoleOutput)
    setIsRunning(false)
  }

  const handleAddTestCase = () => {
    setTestCases([...testCases, { id: `tc-${testCases.length + 1}`, input: "", expectedOutput: "" }])
  }

  const handleUpdateTestCase = (id, field, value) => {
    setTestCases(testCases.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc)))
  }

  const handleRemoveTestCase = (id) => {
    setTestCases(testCases.filter((tc) => tc.id !== id))
  }

  return (
    <div className="python-compiler">
      <div className="editor-area">
        {/* replaced Card with div */}
        <div className="editor-card">
          {/* simplified Tabs with divs and buttons */}
          <div className="tabs-list" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === "problem"}
              onClick={() => setActiveTab("problem")}
            >
              Problem
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "code"}
              onClick={() => setActiveTab("code")}
            >
              Code
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "results"}
              onClick={() => setActiveTab("results")}
            >
              Results
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "console"}
              onClick={() => setActiveTab("console")}
            >
              Console
            </button>
          </div>

          {activeTab === "problem" && (
            <div className="problem-tab" role="tabpanel">
              <h2 className="problem-title">{problem.title}</h2>
              <div className="problem-description" dangerouslySetInnerHTML={{ __html: problem.description }} />
            </div>
          )}

          {activeTab === "code" && (
            <div className="code-tab" role="tabpanel">
              <CodeEditor value={code} onChange={setCode} language="python" />
            </div>
          )}

          {activeTab === "results" && (
            <div role="tabpanel">
              <Results results={results} isLoading={isRunning} />
            </div>
          )}

          {activeTab === "console" && (
            <div role="tabpanel">
              <Console output={consoleOutput} />
            </div>
          )}
        </div>
      </div>

      <div className="testcase-panel">
        {/* replaced Card with div */}
        <div className="testcase-card">
          <div className="testcase-header">
            <h3 className="testcase-title">Test Cases</h3>
            {/* replaced Button with button */}
            <button onClick={handleAddTestCase} disabled={isRunning} style={{ fontSize: "small" }}>
              Add Test Case
            </button>
          </div>

          <TestCases
            testCases={testCases}
            onUpdate={handleUpdateTestCase}
            onRemove={handleRemoveTestCase}
          />

          <div className="run-button-wrapper">
            {/* replaced Button with button */}
            <button onClick={handleRunCode} className="run-button" disabled={isRunning}>
              {isRunning ? "Running..." : "Run Code"}
            </button>
            
          </div>
        </div>
      </div>
    </div>
  )
}
