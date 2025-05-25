/* eslint-disable no-unused-vars */
// This is a JavaScript-based Python interpreter that can execute basic Python code
async function executePythonCode(code, testCase, functionName) {
  await new Promise((resolve) => setTimeout(resolve, 300))

  let consoleOutput = ""
  const consoleLog = (message) => {
    consoleOutput += message + "\n"
  }

  try {
    if (!code.includes(`def ${functionName}`)) {
      return {
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: "",
        passed: false,
        error: `Function '${functionName}' is not defined in your code.`,
        consoleOutput,
      }
    }

    const parsedInput = parseInput(testCase.input)
    const result = interpretPythonCode(code, functionName, parsedInput, consoleLog)
    const formattedOutput = formatOutput(result)
    const normalizedActual = normalizeOutput(formattedOutput)
    const normalizedExpected = normalizeOutput(testCase.expectedOutput)

    return {
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: formattedOutput,
      passed: normalizedActual === normalizedExpected,
      consoleOutput,
    }
  } catch (error) {
    return {
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: "",
      passed: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
      consoleOutput,
    }
  }
}

function parseInput(input) {
  try {
    const listAndValueMatch = input.match(/\[(.*?)\],\s*(\S+)/)
    if (listAndValueMatch) {
      const list = JSON.parse(listAndValueMatch[1].replace(/'/g, '"'))
      const value = parseValue(listAndValueMatch[2])
      return [list, value]
    }

    if (input.trim().startsWith("[") && input.trim().endsWith("]")) {
      return [JSON.parse(input.replace(/'/g, '"'))]
    }

    if (
      (input.trim().startsWith('"') && input.trim().endsWith('"')) ||
      (input.trim().startsWith("'") && input.trim().endsWith("'"))
    ) {
      return [input.trim().slice(1, -1)]
    }

    return [input.trim()]
  } catch (e) {
    return [input]
  }
}

function parseValue(valueStr) {
  if (valueStr === "True" || valueStr === "true") return true
  if (valueStr === "False" || valueStr === "false") return false
  if (valueStr === "None" || valueStr === "null") return null

  const num = Number(valueStr)
  if (!isNaN(num)) return num

  if (
    (valueStr.startsWith('"') && valueStr.endsWith('"')) ||
    (valueStr.startsWith("'") && valueStr.endsWith("'"))
  ) {
    return valueStr.slice(1, -1)
  }

  return valueStr
}

function formatOutput(value) {
  if (value === undefined || value === null) return "None"
  if (typeof value === "boolean") return value ? "True" : "False"
  if (Array.isArray(value)) {
    return `[${value.map(formatOutput).join(", ")}]`
  }
  if (typeof value === "object") {
    try {
      return JSON.stringify(value)
        .replace(/"([^"]+)":/g, "$1:")
        .replace(/"/g, "'")
    } catch {
      return String(value)
    }
  }
  return String(value)
}

function normalizeOutput(output) {
  return output
    .trim()
    .replace(/\s+/g, " ")
    .replace(/'/g, '"')
    .replace(/True/g, "true")
    .replace(/False/g, "false")
    .replace(/None/g, "null")
    .replace(/,\s*]/g, "]")
}

function interpretPythonCode(code, functionName, args, consoleLog) {
  const sandbox = {
    result: null,
    console: { log: consoleLog },
    args,
  }

  try {
    const functionRegex = new RegExp(`def\\s+${functionName}\\s*\\(([^)]*?)\\)\\s*:\\s*([\\s\\S]*?)(?=\\n\\S|$)`, "m")
    const match = code.match(functionRegex)

    if (!match) {
      throw new Error(`Could not find function '${functionName}' in the code.`)
    }

    const [, params, functionBody] = match
    const paramNames = params.split(",").map((p) => p.trim())

    let jsBody = functionBody
      .replace(/^\s{4}/gm, "")
      .replace(/#.*$/gm, "")

    jsBody = convertPythonToJS(jsBody)

    const functionCode = `
      function ${functionName}(${paramNames.join(", ")}) {
        ${jsBody}
      }
      result = ${functionName}(...args);
    `

    const wrappedCode = `"use strict";\n${functionCode}`
    // eslint-disable-next-line no-new-func
    const executor = new Function(...Object.keys(sandbox), wrappedCode)
    executor(...Object.values(sandbox))

    return sandbox.result
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("is not defined")) {
        const varName = error.message.match(/(\w+) is not defined/)?.[1]
        if (varName) throw new Error(`NameError: name '${varName}' is not defined`)
      }

      if (error.message.includes("is not a function")) {
        const funcName = error.message.match(/(\w+) is not a function/)?.[1]
        if (funcName) throw new Error(`TypeError: '${funcName}' is not callable`)
      }
    }

    throw error
  }
}

function convertPythonToJS(pythonCode) {
  let jsCode = pythonCode
    .replace(/\bNone\b/g, "null")
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/print\((.*?)\)/g, "console.log($1)")
    .replace(/len\((.*?)\)/g, "$1.length")
    .replace(/range\((\d+)\)/g, "Array.from({length: $1}, (_, i) => i)")
    .replace(/range\((\d+),\s*(\d+)\)/g, "Array.from({length: $2 - $1}, (_, i) => i + $1)")
    .replace(/\[(.*?) for (.*?) in (.*?)\]/g, "$3.map($2 => $1)")
    .replace(/elif/g, "else if")
    .replace(/(\w+)\s+in\s+(\w+)/g, "$2.includes($1)")
    .replace(/(\s+)return\s+([^;]+)(?!\s*;)/g, "$1return $2;")

  if (!jsCode.includes("return ")) {
    const lines = jsCode.trim().split("\n")
    if (lines.length > 0) {
      const lastLine = lines[lines.length - 1].trim()
      if (lastLine && !lastLine.endsWith(";") && !lastLine.includes("=")) {
        lines[lines.length - 1] = `return ${lastLine};`
        jsCode = lines.join("\n")
      }
    }
  }

  return jsCode
}
