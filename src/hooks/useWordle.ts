import { words } from '@root/db.json'

import type { FormatLetter } from '@customTypes/format-word'
import type { GameState } from '@customTypes/game-state'

import { useCallback, useEffect, useState } from 'react'

const DEFAULT_GUESSES_VALUE = [...Array(6)]

export const useWordle = (solution: string) => {
  const [tries, setTries] = useState(0)
  const [isUserWordCorrect, setIsUserWordCorrect] = useState(false)
  const [currentWord, setCurrentWord] = useState('')
  const [guesses, setGuesses] = useState<Array<FormatLetter[] | undefined>>(
    DEFAULT_GUESSES_VALUE
  )
  const [history, setHistory] = useState<Array<string>>([])
  const [gameState, setGameState] = useState<GameState | null>(null)
  const isGameOver = tries > 5

  const resetGame = useCallback(() => {
    setTries(0)
    setIsUserWordCorrect(false)
    setCurrentWord('')
    setGuesses(DEFAULT_GUESSES_VALUE)
    setHistory([])
    setGameState(null)
  }, [])

  const handleNewWord = (formattedWord: Array<FormatLetter>) => {
    const isWordCorrect = currentWord === solution

    if (isWordCorrect) {
      setGameState(() => ({
        message: 'Congratulations you find the word.',
        name: 'success',
        title: 'You Win.'
      }))

      setIsUserWordCorrect(() => true)
    }

    if (isGameOver) {
      setGameState(() => ({
        message: `Your tries has ended. The word was ${solution}`,
        name: 'error',
        title: 'Game over'
      }))
    }

    setGuesses((prev) => {
      const newGuesses = [...prev]
      newGuesses[tries] = formattedWord

      return newGuesses
    })
    setHistory((prev) => [...prev, currentWord])

    setTries((prev) => prev + 1)

    setCurrentWord('')
  }

  const formatWord = (): Array<FormatLetter> => {
    const solutionArray: Array<string | null> = [...solution]
    const currentWordArray: Array<FormatLetter> = [...currentWord].map(
      (letter) => ({
        letter,
        color: 'bg-gray-300/60'
      })
    )

    currentWordArray.forEach(({ letter }, idx) => {
      const neededLetter = solutionArray[idx]
      const isRightPlaced = letter === neededLetter

      if (isRightPlaced) {
        currentWordArray[idx].color = 'bg-green-300/60'
        solutionArray[idx] = null
      }
    })

    currentWordArray.forEach(({ letter, color }, idx) => {
      const isInTheWord =
        solutionArray.includes(letter) && color !== 'bg-green-300/60'

      if (isInTheWord) {
        const indexOfLetter = solutionArray.indexOf(letter)

        currentWordArray[idx].color = 'bg-yellow-300/60'
        solutionArray[indexOfLetter] = null
      }
    })

    return currentWordArray
  }

  const handleKeyUp = (evt: KeyboardEvent) => {
    const { key } = evt
    const isLetter = /^[a-zA-z]$/.test(key)
    const isDeleting = key === 'Backspace'
    const isSubmiting = key === 'Enter'
    const isWordInList = words.includes(currentWord)
    const isRepeatedWord = history.includes(currentWord)
    const isWordWithNeededLength = currentWord.length === 5

    if (isDeleting) return setCurrentWord((prev) => prev.slice(0, -1))

    if (isSubmiting) {
      if (!isWordWithNeededLength) {
        setGameState(() => ({
          title: 'Word too short',
          message: 'The word needs to be 5 letters.',
          name: 'warning'
        }))
        return
      }

      if (!isWordInList) {
        setGameState(() => ({
          message:
            'The word you are trying is not in the list. Try with another word.',
          name: 'warning',
          title: 'Word not found'
        }))
        return
      }

      if (isRepeatedWord) {
        setGameState(() => ({
          message: 'The current word was already written.',
          name: 'warning',
          title: 'Word repeated'
        }))
        return
      }

      const formattedWord = formatWord()

      handleNewWord(formattedWord)
    }

    if (isLetter)
      return setCurrentWord((prev) => {
        const isFiveChars = prev.length < 5

        if (isFiveChars) return (prev += key)

        return prev
      })
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    if (isGameOver) window.removeEventListener('keyup', handleKeyUp)
    if (isUserWordCorrect) window.removeEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp])

  const resetGameState = () => setGameState(null)

  return {
    currentWord,
    guesses,
    tries,
    gameState,
    resetGame,
    isUserWordCorrect,
    resetGameState
  }
}

export type UseWordleReturn = ReturnType<typeof useWordle>
