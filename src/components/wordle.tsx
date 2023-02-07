import { useWordle } from '@hooks/useWordle'
import { useCallback, useMemo, useState } from 'react'

import Board from './board'
import GameModal from './game-modal'
import Keyboard from './keyboard'

import { getRandomWord } from '@/utils'
import type { FormatLetter } from '@customTypes/format-word'

export default function Wordle() {
  const [solution, setSolution] = useState(() => getRandomWord())
  const {
    currentWord,
    guesses,
    tries,
    gameState,
    resetGame,
    isUserWordCorrect,
    resetGameState
  } = useWordle(solution)

  const usedLetters = useMemo(() => {
    const nonEmptyWords = guesses.filter(Boolean) as Array<
      NonNullable<FormatLetter[]>
    >
    const flattenWords = nonEmptyWords.flatMap((letter) => letter)
    const letters = [...new Set(flattenWords.map(({ letter }) => letter))]

    return letters.map((letter) => {
      const color: FormatLetter['color'] =
        flattenWords.find((searchLetter) => letter === searchLetter.letter)
          ?.color || 'bg-gray-300/60'

      return {
        letter,
        color
      }
    })
  }, [guesses])

  const handleCloseModal = useCallback(() => {
    if (isUserWordCorrect) {
      resetGame()
      setSolution(() => getRandomWord())
    } else {
      resetGameState()
    }
  }, [isUserWordCorrect])

  return (
    <>
      <Board currentWord={currentWord} guesses={guesses} tries={tries} />
      <Keyboard usedLetters={usedLetters} />

      {gameState && (
        <GameModal gameState={gameState} handleClose={handleCloseModal} />
      )}
    </>
  )
}
