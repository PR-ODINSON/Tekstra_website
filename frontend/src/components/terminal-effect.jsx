"use client"

import { useState, useEffect } from "react"

export default function TerminalEffect({ text, typingSpeed = 50, cursorBlinkSpeed = 500 }) {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (isTyping) {
      if (displayedText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, displayedText.length + 1))
        }, typingSpeed)

        return () => clearTimeout(timeout)
      } else {
        setIsTyping(false)
      }
    }

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, cursorBlinkSpeed)

    return () => clearInterval(cursorInterval)
  }, [displayedText, isTyping, text, typingSpeed, cursorBlinkSpeed])

  return (
    <span className="font-mono">
      {displayedText}
      {showCursor && <span className="text-cyan-400">_</span>}
    </span>
  )
}

