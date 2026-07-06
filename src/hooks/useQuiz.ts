import { useReducer, useCallback } from 'react'
import type { Question } from '../data/questions'

export interface QuizState {
  phase: 'idle' | 'playing' | 'feedback' | 'finished'
  questions: Question[]
  currentIndex: number
  answers: (number | null)[]
  score: number
  timeLeft: number
}

type QuizAction =
  | { type: 'START_QUIZ'; questions: Question[] }
  | { type: 'ANSWER'; selectedIndex: number }
  | { type: 'TICK' }
  | { type: 'ADVANCE' }
  | { type: 'PLAY_AGAIN' }

const INITIAL_TIME = 60

function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const initialState: QuizState = {
  phase: 'idle',
  questions: [],
  currentIndex: 0,
  answers: [],
  score: 0,
  timeLeft: INITIAL_TIME,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...initialState,
        phase: 'playing',
        questions: action.questions,
        timeLeft: INITIAL_TIME,
      }

    case 'ANSWER': {
      const current = state.questions[state.currentIndex]
      const isCorrect = action.selectedIndex === current.correctIndex
      return {
        ...state,
        phase: 'feedback',
        answers: [...state.answers, action.selectedIndex],
        score: state.score + (isCorrect ? 1 : 0),
      }
    }

    case 'TICK': {
      if (state.phase !== 'playing') return state
      if (state.timeLeft <= 1) {
        return {
          ...state,
          timeLeft: 0,
          phase: 'feedback',
          answers: [...state.answers, null],
        }
      }
      return { ...state, timeLeft: state.timeLeft - 1 }
    }

    case 'ADVANCE': {
      const nextIndex = state.currentIndex + 1
      if (nextIndex >= state.questions.length) {
        return { ...state, phase: 'finished', timeLeft: 0 }
      }
      return {
        ...state,
        phase: 'playing',
        currentIndex: nextIndex,
        timeLeft: INITIAL_TIME,
      }
    }

    case 'PLAY_AGAIN':
      return initialState

    default:
      return state
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  const startQuiz = useCallback(
    (allQuestions: Question[]) => {
      const round1 = shuffle(allQuestions.filter(q => q.round === 1))
      const round2 = shuffle(allQuestions.filter(q => q.round === 2))
      dispatch({ type: 'START_QUIZ', questions: [...round1, ...round2] })
    },
    []
  )

  const answer = useCallback(
    (selectedIndex: number) => dispatch({ type: 'ANSWER', selectedIndex }),
    []
  )

  const advance = useCallback(
    () => dispatch({ type: 'ADVANCE' }),
    []
  )

  const tick = useCallback(
    () => dispatch({ type: 'TICK' }),
    []
  )

  const playAgain = useCallback(
    () => dispatch({ type: 'PLAY_AGAIN' }),
    []
  )

  return { state, startQuiz, answer, advance, tick, playAgain }
}
