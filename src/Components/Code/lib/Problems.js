export const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: `
      <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
      <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
      <p>You can return the answer in any order.</p>
      
      <h3>Example 1:</h3>
      <pre>
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
      </pre>
      
      <h3>Example 2:</h3>
      <pre>
Input: nums = [3,2,4], target = 6
Output: [1,2]
      </pre>
      
      <h3>Example 3:</h3>
      <pre>
Input: nums = [3,3], target = 6
Output: [0,1]
      </pre>
      
      <h3>Constraints:</h3>
      <ul>
        <li>2 <= nums.length <= 10^4</li>
        <li>-10^9 <= nums[i] <= 10^9</li>
        <li>-10^9 <= target <= 10^9</li>
        <li>Only one valid answer exists.</li>
      </ul>
    `,
    difficulty: "Easy",
    starterCode: `def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your code here
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
`,
    testCases: [
      {
        id: "tc-1",
        input: "[2,7,11,15], 9",
        expectedOutput: "[0, 1]",
      },
      {
        id: "tc-2",
        input: "[3,2,4], 6",
        expectedOutput: "[1, 2]",
      },
      {
        id: "tc-3",
        input: "[3,3], 6",
        expectedOutput: "[0, 1]",
      },
    ],
    functionName: "two_sum",
  },
  {
    id: "palindrome",
    title: "Valid Palindrome",
    description: `
      <p>A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.</p>
      <p>Given a string <code>s</code>, return <code>true</code> if it is a palindrome, or <code>false</code> otherwise.</p>
      
      <h3>Example 1:</h3>
      <pre>
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
      </pre>
      
      <h3>Example 2:</h3>
      <pre>
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
      </pre>
      
      <h3>Constraints:</h3>
      <ul>
        <li>1 <= s.length <= 2 * 10^5</li>
        <li>s consists only of printable ASCII characters.</li>
      </ul>
    `,
    difficulty: "Easy",
    starterCode: `def is_palindrome(s):
    """
    :type s: str
    :rtype: bool
    """
    # Write your code here
    # Remove non-alphanumeric characters and convert to lowercase
    filtered_chars = [c.lower() for c in s if c.isalnum()]
    filtered_str = ''.join(filtered_chars)
    
    # Check if the string is equal to its reverse
    return filtered_str == filtered_str[::-1]
`,
    testCases: [
      {
        id: "tc-1",
        input: "A man, a plan, a canal: Panama",
        expectedOutput: "True",
      },
      {
        id: "tc-2",
        input: "race a car",
        expectedOutput: "False",
      },
      {
        id: "tc-3",
        input: " ",
        expectedOutput: "True",
      },
    ],
    functionName: "is_palindrome",
  },
  {
    id: "fibonacci",
    title: "Fibonacci Number",
    description: `
      <p>The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.</p>
      <p>That is,</p>
      <pre>
F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
      </pre>
      <p>Given n, calculate F(n).</p>
      
      <h3>Example 1:</h3>
      <pre>
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
      </pre>
      
      <h3>Example 2:</h3>
      <pre>
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
      </pre>
      
      <h3>Example 3:</h3>
      <pre>
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
      </pre>
      
      <h3>Constraints:</h3>
      <ul>
        <li>0 <= n <= 30</li>
      </ul>
    `,
    difficulty: "Easy",
    starterCode: `def fibonacci(n):
    """
    :type n: int
    :rtype: int
    """
    # Write your code here
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)
`,
    testCases: [
      {
        id: "tc-1",
        input: "2",
        expectedOutput: "1",
      },
      {
        id: "tc-2",
        input: "3",
        expectedOutput: "2",
      },
      {
        id: "tc-3",
        input: "10",
        expectedOutput: "55",
      },
    ],
    functionName: "fibonacci",
  },
]
