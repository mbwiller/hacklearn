import { useState, useEffect, useCallback } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '')
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const docHeight = document.documentElement.scrollHeight

    // Calculate overall progress
    const totalProgress = scrollY / (docHeight - windowHeight)
    setProgress(Math.min(Math.max(totalProgress, 0), 1))

    // Find active section
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const element = document.getElementById(sectionIds[i])
      if (element) {
        const rect = element.getBoundingClientRect()
        // Section is active if its top is above the middle of the viewport
        if (rect.top <= windowHeight * 0.5) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }
  }, [sectionIds])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return { activeSection, progress, scrollToSection }
}
