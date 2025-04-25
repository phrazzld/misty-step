"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if the user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
    
    // Apply initial theme
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      
      // Log dark mode variables for testing
      console.log('Dark mode enabled - CSS variables:')
      const computedStyle = getComputedStyle(document.documentElement)
      console.log('--primary:', computedStyle.getPropertyValue('--primary'))
      console.log('--background:', computedStyle.getPropertyValue('--background'))
      console.log('--card:', computedStyle.getPropertyValue('--card'))
    } else {
      document.documentElement.classList.remove('dark')
      
      // Log light mode variables for testing
      console.log('Light mode enabled - CSS variables:')
      const computedStyle = getComputedStyle(document.documentElement)
      console.log('--primary:', computedStyle.getPropertyValue('--primary'))
      console.log('--background:', computedStyle.getPropertyValue('--background'))
      console.log('--card:', computedStyle.getPropertyValue('--card'))
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleDarkMode}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? "🌞" : "🌙"}
    </Button>
  )
}