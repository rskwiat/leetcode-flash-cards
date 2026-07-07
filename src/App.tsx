import { useCallback } from 'react'
import { ToastContainer } from 'react-toastify'
import { questions } from './data/questions'
import { useQuiz } from './hooks/useQuiz'
import { StartScreen } from './components/StartScreen'
import { QuizScreen } from './components/QuizScreen'
import { ResultScreen } from './components/ResultScreen'
import './App.css'

function App() {
  const { state, startQuiz, answer, advance, tick, playAgain, skipToEnd } = useQuiz()

  const handleStart = useCallback(() => {
    startQuiz(questions)
  }, [startQuiz])

  return (
    <div className="app">
      {state.phase === 'idle' && <StartScreen onStart={handleStart} />}

      {(state.phase === 'playing' || state.phase === 'feedback') && (
        <QuizScreen
          state={state}
          onAnswer={answer}
          onAdvance={advance}
          onTick={tick}
          onSkipToEnd={skipToEnd}
        />
      )}

      {state.phase === 'finished' && (
        <ResultScreen
          score={state.score}
          total={state.questions.length}
          questions={state.questions}
          answers={state.answers}
          onPlayAgain={playAgain}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
