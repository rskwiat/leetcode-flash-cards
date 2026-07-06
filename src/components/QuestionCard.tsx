import type { Question } from '../data/questions'
import './QuestionCard.css'

interface QuestionCardProps {
  question: Question
  selectedIndex: number | null
  onAnswer: (index: number) => void
  disabled: boolean
}

const PATTERN_LABELS: Record<string, string> = {
  'Hash map / frequency count': 'Hash Map',
  'Two pointers': 'Two Pointers',
  'Sliding window': 'Sliding Window',
  'Fast & slow pointers': 'Fast & Slow Pointers',
  'Binary search': 'Binary Search',
  'Stack': 'Stack',
  'BFS (breadth-first search)': 'BFS',
  'DFS (depth-first search)': 'DFS',
  'Backtracking': 'Backtracking',
  'Dynamic programming': 'Dynamic Programming',
  'Heap / priority queue': 'Heap',
  'Union-Find': 'Union-Find',
  'Intervals (sort + sweep)': 'Intervals',
  'Topological sort': 'Topological Sort',
  'Trie (prefix tree)': 'Trie',
}

export function QuestionCard({ question, selectedIndex, onAnswer, disabled }: QuestionCardProps) {
  return (
    <div className="question-card">
      <p className="question-card__stem">{question.stem}</p>
      <div className="question-card__options">
        {question.options.map((option, i) => {
          let className = 'question-card__option'
          if (selectedIndex !== null) {
            if (i === question.correctIndex) {
              className += ' question-card__option--correct'
            } else if (i === selectedIndex) {
              className += ' question-card__option--wrong'
            } else {
              className += ' question-card__option--dimmed'
            }
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => onAnswer(i)}
              disabled={disabled}
            >
              <span className="question-card__option-key">{String.fromCharCode(65 + i)}</span>
              <span className="question-card__option-label">
                {PATTERN_LABELS[option] ?? option}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
