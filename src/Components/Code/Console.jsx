"use client"

import "./Console.css"

export function Console({ output }) {
  return (
    <div className="console-container">
      {output ? (
        <pre>{output}</pre>
      ) : (
        <div className="console-placeholder">
          Console output will appear here when you run your code.
        </div>
      )}
    </div>
  )
}
