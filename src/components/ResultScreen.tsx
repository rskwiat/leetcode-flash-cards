import type { Question } from '../data/questions'
import './ResultScreen.css'

interface ResultScreenProps {
  score: number
  total: number
  questions: Question[]
  answers: (number | null)[]
  onPlayAgain: () => void
}

export function ResultScreen({ score, total, questions, answers, onPlayAgain }: ResultScreenProps) {
  const pct = Math.round((score / total) * 100)

  const round1Questions = questions.filter(q => q.round === 1)
  const round2Questions = questions.filter(q => q.round === 2)
  const round1Correct = round1Questions.filter(q => answers[questions.indexOf(q)] === q.correctIndex).length
  const round2Correct = round2Questions.filter(q => answers[questions.indexOf(q)] === q.correctIndex).length

  return (
    <div className="result-screen">
      <h1 className="result-screen__title">Quiz Complete!</h1>
      <div className="result-screen__score">
        <span className="result-screen__score-value">{score}</span>
        <span className="result-screen__score-divider">/</span>
        <span className="result-screen__score-total">{total}</span>
      </div>
      <p className="result-screen__pct">{pct}%</p>

      <div className="result-screen__round-header">Round 1 — {round1Correct}/{round1Questions.length} ({Math.round((round1Correct / round1Questions.length) * 100)}%)</div>
      {questions
        .filter(q => q.round === 1)
        .map((q, idx) => renderCard(q, idx, questions, answers, 'round1'))}

      <div className="result-screen__round-header">Round 2 — {round2Correct}/{round2Questions.length} ({Math.round((round2Correct / round2Questions.length) * 100)}%)</div>
      {questions
        .filter(q => q.round === 2)
        .map((q, idx) => renderCard(q, idx, questions, answers, 'round2'))}

      <button className="result-screen__button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  )
}

function renderCard(q: Question, idx: number, allQuestions: Question[], answers: (number | null)[], prefix: string) {
  const questionIndex = allQuestions.indexOf(q)
  const userAnswer = answers[questionIndex]
  const isCorrect = userAnswer === q.correctIndex

  const encode = (s: string) => encodeURIComponent(s)
  const searchUrl = `https://leetcode.com/problemset/?search=${encode(q.options[q.correctIndex])}`

  return (
    <div key={prefix + '-' + idx} className="result-screen__card">
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
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Practice on LeetCode →
      </a>
    </div>
  )
}
