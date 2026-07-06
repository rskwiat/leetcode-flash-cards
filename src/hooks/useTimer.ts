import { useEffect, useRef } from 'react'

export function useTimer(
  active: boolean,
  onTick: () => void,
  intervalMs: number = 1000
) {
  const savedCallback = useRef(onTick)

  useEffect(() => {
    savedCallback.current = onTick
  }, [onTick])

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => savedCallback.current(), intervalMs)
    return () => clearInterval(id)
  }, [active, intervalMs])
}
