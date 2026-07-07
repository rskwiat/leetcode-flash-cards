import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { Timer } from './Timer'
import { QuestionCard } from './QuestionCard'
import { useTimer } from '../hooks/useTimer'
import type { QuizState } from '../hooks/useQuiz'
import './QuizScreen.css'

interface QuizScreenProps {
  state: QuizState
  onAnswer: (index: number) => void
  onAdvance: () => void
  onTick: () => void
  onSkipToEnd: () => void
}

export function QuizScreen({ state, onAnswer, onAdvance, onTick, onSkipToEnd }: QuizScreenProps) {
  const question = state.questions[state.currentIndex]
  const total = state.questions.length
  const answeredCount = state.answers.length
  const lastAnswer = answeredCount > 0 ? state.answers[answeredCount - 1] : null
  const isFeedback = state.phase === 'feedback'
  const toastFired = useRef(false)

  useTimer(state.phase === 'playing', onTick)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
      e.preventDefault()
      onSkipToEnd()
    }
  }, [onSkipToEnd])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (state.phase === 'feedback' && !toastFired.current) {
      toastFired.current = true

      if (lastAnswer === question.correctIndex) {
        toast.success('Correct!', { onClose: onAdvance })
      } else if (lastAnswer === null) {
        toast.warning(`Time out! Answer: ${question.options[question.correctIndex]}`, { onClose: onAdvance })
      } else {
        toast.error(`Answer: ${question.options[question.correctIndex]}`, { onClose: onAdvance })
      }
    } else if (state.phase !== 'feedback') {
      toastFired.current = false
    }
  }, [state.phase, onAdvance, lastAnswer, question])

  const currentAnswer = isFeedback ? (lastAnswer ?? question.correctIndex) : null

  return (
    <div className="quiz-screen">
      <div className="quiz-screen__header">
        <span className="quiz-screen__progress">
          Q {state.currentIndex + 1} / {total}
        </span>
        <Timer timeLeft={state.timeLeft} />
        <span className="quiz-screen__score">{state.score} / {answeredCount}</span>
      </div>

      <QuestionCard
        question={question}
        selectedIndex={currentAnswer}
        onAnswer={onAnswer}
        disabled={isFeedback}
      />
    </div>
  )
}
