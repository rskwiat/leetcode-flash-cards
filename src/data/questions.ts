export interface Question {
  id: number
  stem: string
  options: [string, string, string]
  correctIndex: 0 | 1 | 2
  round: 1 | 2
}

export const questions: Question[] = [
  // Round 1
  {
    id: 1,
    stem: 'Given an array of integers, find two numbers that add up to a target value.',
    options: ['Hash map / frequency count', 'Two pointers', 'Binary search'],
    correctIndex: 0,
    round: 1,
  },
  {
    id: 2,
    stem: 'Given a string, find the length of the longest substring without repeating characters.',
    options: ['Hash map / frequency count', 'Sliding window', 'Stack'],
    correctIndex: 1,
    round: 1,
  },
  {
    id: 3,
    stem: 'Given a sorted array, find if a target value exists in it.',
    options: ['Sliding window', 'Two pointers', 'Binary search'],
    correctIndex: 2,
    round: 1,
  },
  {
    id: 4,
    stem: 'Given a linked list, determine if it contains a cycle.',
    options: ['Fast & slow pointers', 'Hash map / frequency count', 'Two pointers'],
    correctIndex: 0,
    round: 1,
  },
  {
    id: 5,
    stem: 'Given an array, find the maximum sum of any contiguous subarray.',
    options: ['Dynamic programming', 'Sliding window', 'Heap / priority queue'],
    correctIndex: 1,
    round: 1,
  },
  {
    id: 6,
    stem: 'Given a binary tree, return the values level by level (left to right).',
    options: ['BFS (breadth-first search)', 'DFS (depth-first search)', 'Stack'],
    correctIndex: 0,
    round: 1,
  },
  {
    id: 7,
    stem: 'Given two strings, determine if one is an anagram of the other.',
    options: ['Stack', 'Two pointers', 'Hash map / frequency count'],
    correctIndex: 2,
    round: 1,
  },
  {
    id: 8,
    stem: 'Given an array of intervals, merge all overlapping intervals.',
    options: ['Heap / priority queue', 'Intervals (sort + sweep)', 'Stack'],
    correctIndex: 1,
    round: 1,
  },
  {
    id: 9,
    stem: 'Given a grid of 1s (land) and 0s (water), count the number of islands.',
    options: ['DFS (depth-first search)', 'BFS (breadth-first search)', 'Union-Find'],
    correctIndex: 0,
    round: 1,
  },
  {
    id: 10,
    stem: 'Given a set of coins and a target amount, find the minimum number of coins needed.',
    options: ['BFS (breadth-first search)', 'Dynamic programming', 'Heap / priority queue'],
    correctIndex: 1,
    round: 1,
  },
  // Round 2
  {
    id: 11,
    stem: 'Given an array, find the k most frequent elements.',
    options: ['Binary search', 'Hash map / frequency count', 'Heap / priority queue'],
    correctIndex: 2,
    round: 2,
  },
  {
    id: 12,
    stem: 'Given a matrix where rows and columns are sorted, search for a target value.',
    options: ['Binary search', 'Two pointers', 'Stack'],
    correctIndex: 0,
    round: 2,
  },
  {
    id: 13,
    stem: 'Given a string of parentheses, determine if they are balanced.',
    options: ['Hash map / frequency count', 'Stack', 'Two pointers'],
    correctIndex: 1,
    round: 2,
  },
  {
    id: 14,
    stem: 'Given an array, find the length of the longest increasing subsequence.',
    options: ['Sliding window', 'Binary search', 'Dynamic programming'],
    correctIndex: 2,
    round: 2,
  },
  {
    id: 15,
    stem: 'Given a rotated sorted array, find the minimum element.',
    options: ['Binary search', 'Two pointers', 'Heap / priority queue'],
    correctIndex: 0,
    round: 2,
  },
  {
    id: 16,
    stem: 'Given two sorted linked lists, merge them into one sorted list.',
    options: ['Heap / priority queue', 'Two pointers', 'Stack'],
    correctIndex: 1,
    round: 2,
  },
  {
    id: 17,
    stem: 'Given a list of stock prices by day, find the maximum profit from one buy and one sell.',
    options: ['Stack', 'Dynamic programming', 'Sliding window'],
    correctIndex: 2,
    round: 2,
  },
  {
    id: 18,
    stem: 'Given a binary tree, determine if it is a valid binary search tree.',
    options: ['Stack', 'BFS (breadth-first search)', 'DFS (depth-first search)'],
    correctIndex: 2,
    round: 2,
  },
  {
    id: 19,
    stem: 'Given an array of numbers, find if there exist three numbers that sum to zero.',
    options: ['Hash map / frequency count', 'Two pointers', 'Binary search'],
    correctIndex: 1,
    round: 2,
  },
  {
    id: 20,
    stem: 'Given a graph of courses with prerequisites, determine if it is possible to finish all courses.',
    options: ['Topological sort', 'BFS (breadth-first search)', 'DFS (depth-first search)'],
    correctIndex: 0,
    round: 2,
  },
]
