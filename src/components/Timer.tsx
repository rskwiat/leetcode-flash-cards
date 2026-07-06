import './Timer.css'

interface TimerProps {
  timeLeft: number
}

export function Timer({ timeLeft }: TimerProps) {
  const urgent = timeLeft <= 10

  return (
    <div className={`timer ${urgent ? 'timer--urgent' : ''}`}>
      <span className="timer__label">Time</span>
      <span className="timer__value">{timeLeft}s</span>
    </div>
  )
}
