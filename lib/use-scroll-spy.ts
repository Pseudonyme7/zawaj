import { useState, useEffect } from 'react'

/**
 * Custom hook for scroll spy functionality
 * Detects which section is currently in view and updates active section
 */
export function useScrollSpy(sectionIds: string[], offset: number = 100) {
	const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '')

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + offset

			// Find the section that is currently in view
			for (let i = sectionIds.length - 1; i >= 0; i--) {
				const section = document.getElementById(sectionIds[i])
				if (section && section.offsetTop <= scrollPosition) {
					setActiveSection(sectionIds[i])
					break
				}
			}
		}

		// Set initial active section
		handleScroll()

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [sectionIds, offset])

	return activeSection
}

/**
 * Smooth scroll to element with offset for fixed navbar
 */
export function smoothScrollTo(elementId: string, offset: number = 80) {
	const element = document.getElementById(elementId)
	if (element) {
		const offsetTop = element.offsetTop - offset
		window.scrollTo({
			top: offsetTop,
			behavior: 'smooth'
		})
	}
} 