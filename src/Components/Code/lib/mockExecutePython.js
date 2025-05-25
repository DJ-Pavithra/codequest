// This is a mock function that simulates executing Python code
// In a real application, this would send the code to a backend service

/**
 * @param {string} code - The Python code string
 * @param {{ input: string, expectedOutput: string, id: string }} testCase - The test case
 * @param {string} functionName - The function name to test
 * @returns {Promise<{ input: string, expectedOutput: string, actualOutput: string, passed: boolean, error?: string }>}
 */
export async function mockExecutePython(code, testCase, functionName) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

  try {
    // Check if the function is defined in the code
    if (!code.includes(`def ${functionName}`)) {
      return {
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: "",
        passed: false,
        error: `Function '${functionName}' is not defined in your code.`,
      };
    }

    let output = "";

    // Mock for two_sum
    if (functionName === "two_sum") {
      const input = testCase.input.trim();
      const match = input.match(/\[(.*?)\],\s*(\d+)/);

      if (match) {
        const nums = match[1].split(",").map((n) => parseInt(n.trim(), 10));
        const target = parseInt(match[2], 10);

        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
              output = `[${i}, ${j}]`;
              break;
            }
          }
          if (output) break;
        }

        if (Math.random() < 0.2 && output) {
          const indices = output
            .slice(1, -1)
            .split(",")
            .map((n) => parseInt(n.trim(), 10));
          output = `[${indices[1]}, ${indices[0]}]`;
        }
      }
    }

    // Mock for is_palindrome
    else if (functionName === "is_palindrome") {
      const input = testCase.input.trim().replace(/"/g, "").replace(/'/g, "");
      const isPalindrome = input === input.split("").reverse().join("");
      output = isPalindrome.toString().toLowerCase();

      if (Math.random() < 0.2) {
        output = (!isPalindrome).toString().toLowerCase();
      }
    }

    // Generic fallback
    else {
      output = testCase.expectedOutput;

      if (Math.random() < 0.3) {
        if (output.includes("[")) {
          output = output.replace(/\d/, Math.floor(Math.random() * 10).toString());
        } else if (!isNaN(Number(output))) {
          output = (Number(output) + 1).toString();
        } else {
          output = output + " (modified)";
        }
      }
    }

    // Occasionally simulate syntax error
    if (Math.random() < 0.1 && !code.includes("print")) {
      throw new Error("SyntaxError: invalid syntax");
    }

    return {
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: output,
      passed: output.trim() === testCase.expectedOutput.trim(),
    };
  } catch (error) {
    return {
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: "",
      passed: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
