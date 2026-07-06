import './StartScreen.css'

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <h1 className="start-screen__title">LeetCode Pattern Quiz</h1>
      <p className="start-screen__desc">
        Identify the algorithm pattern behind each LeetCode problem.
        You have 60 seconds per question. 20 questions across 2 rounds.
      </p>
      <button className="start-screen__button" onClick={onStart}>
        Start Quiz
      </button>
    </div>
  )
}
