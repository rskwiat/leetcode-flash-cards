import './ResultScreen.css'

interface ResultScreenProps {
  score: number
  total: number
  onPlayAgain: () => void
}

export function ResultScreen({ score, total, onPlayAgain }: ResultScreenProps) {
  const pct = Math.round((score / total) * 100)

  return (
    <div className="result-screen">
      <h1 className="result-screen__title">Quiz Complete!</h1>
      <div className="result-screen__score">
        <span className="result-screen__score-value">{score}</span>
        <span className="result-screen__score-divider">/</span>
        <span className="result-screen__score-total">{total}</span>
      </div>
      <p className="result-screen__pct">{pct}%</p>
      <button className="result-screen__button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  )
}
