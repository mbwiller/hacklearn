import { useInView } from 'framer-motion'
import { useRef, type RefObject } from 'react'

interface UseInViewAnimationOptions {
  threshold?: number
  once?: boolean
  margin?: string
}

interface UseInViewAnimationResult {
  ref: RefObject<HTMLDivElement>
  isInView: boolean
  animationProps: {
    initial: string
    animate: string
  }
}

export function useInViewAnimation(
  options: UseInViewAnimationOptions = {}
): UseInViewAnimationResult {
  const {
    threshold = 0.3,
    once = true,
    margin = '-50px'
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    amount: threshold,
    once,
    margin: margin as `${number}px`
  })

  return {
    ref,
    isInView,
    animationProps: {
      initial: 'hidden',
      animate: isInView ? 'visible' : 'hidden',
    },
  }
}
