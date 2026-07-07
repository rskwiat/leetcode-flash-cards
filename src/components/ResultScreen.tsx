import type { Question } from '../data/questions'
import './ResultScreen.css'

interface ResultScreenProps {
  score: number
  total: number
  questions: Question[]
  answers: (number | null)[]
  onPlayAgain: () => void
}

function roundPct(correct: number, total: number): string {
  return total === 0 ? '0%' : `${Math.round((correct / total) * 100)}%`
}

const TAG_SLUGS: Record<string, string> = {
  'Hash map / frequency count': 'hash-function',
  'Sliding window': 'sliding-window',
  'Binary search': 'binary-search',
  'Fast & slow pointers': 'two-pointers',
  'BFS (breadth-first search)': 'breadth-first-search',
  'Intervals (sort + sweep)': 'sorting',
  'DFS (depth-first search)': 'depth-first-search',
  'Dynamic programming': 'dynamic-programming',
  'Heap / priority queue': 'heap-priority-queue',
  'Stack': 'stack',
  'Two pointers': 'two-pointers',
  'Topological sort': 'topological-sort',
}

function tagUrl(answerText: string): string {
  const slug = TAG_SLUGS[answerText]
  return slug
    ? `https://leetcode.com/problem-list/${slug}/`
    : `https://leetcode.com/problemset/?search=${encodeURIComponent(answerText)}`
}

export function ResultScreen({ score, total, questions, answers, onPlayAgain }: ResultScreenProps) {
  const pct = Math.round((score / total) * 100)
  const answerByQuestion = new Map(questions.map((q, i) => [q.id, answers[i]]))

  const round1Questions = questions.filter(q => q.round === 1)
  const round2Questions = questions.filter(q => q.round === 2)
  const round1Correct = round1Questions.filter(q => answerByQuestion.get(q.id) === q.correctIndex).length
  const round2Correct = round2Questions.filter(q => answerByQuestion.get(q.id) === q.correctIndex).length

  return (
    <div className="result-screen">
      <h1 className="result-screen__title">Quiz Complete!</h1>
      <div className="result-screen__score">
        <span className="result-screen__score-value">{score}</span>
        <span className="result-screen__score-divider">/</span>
        <span className="result-screen__score-total">{total}</span>
      </div>
      <p className="result-screen__pct">{pct}%</p>
        <div className="result-screen__round-header">Round 1 — {round1Correct}/{round1Questions.length} ({roundPct(round1Correct, round1Questions.length)})</div>


        <div className="result-screen__card_container">
          {round1Questions.map(q => renderCard(q, answerByQuestion))}
        </div>

        <div className="result-screen__round-header">Round 2 — {round2Correct}/{round2Questions.length} ({roundPct(round2Correct, round2Questions.length)})</div>

      <div className="result-screen__card_container">
        {round2Questions.map(q => renderCard(q, answerByQuestion))}
      </div>
      <button className="result-screen__button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  )
}

function renderCard(q: Question, answerByQuestion: Map<number, number | null>) {
  const userAnswer = answerByQuestion.get(q.id) ?? null
  const isCorrect = userAnswer === q.correctIndex

  const practiceUrl = tagUrl(q.options[q.correctIndex])

  return (
    <div key={q.id} className="result-screen__card">
      <div className="result-screen__card-header">
        <div className={`result-screen__badge ${isCorrect ? 'result-screen__badge--correct' : 'result-screen__badge--incorrect'}`}>
          {isCorrect ? '✓' : '✗'}
        </div>
        <p className="result-screen__stem">{q.stem}</p>
      </div>
      <div className="result-screen__answers">
        <div className={`result-screen__answer-row ${userAnswer === null ? 'result-screen__answer-row--incorrect' : userAnswer !== q.correctIndex ? 'result-screen__answer-row--incorrect' : ''}`}>
          <strong>Your answer:</strong> {userAnswer !== null ? q.options[userAnswer] : 'Time ran out'}
        </div>
        <div className="result-screen__answer-row result-screen__answer-row--correct">
          <strong>Correct answer:</strong> {q.options[q.correctIndex]}
        </div>
      </div>
      <a
        className="result-screen__practice-link"
        href={practiceUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Practice on LeetCode →
      </a>
    </div>
  )
}
