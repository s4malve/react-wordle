import type { FormatLetter } from '@customTypes/format-word'
import { useState } from 'react'
import Letter from './letter'

export default function Row({ guess, currentWord }: RowProps) {
  const isSubmiting = guess
  const isWriting = currentWord
  const [deafultColums] = useState(() => [...Array(5)])

  if (isSubmiting) {
    return (
      <div className='flex gap-2 '>
        {guess.map(({ letter, color }, i) => (
          <Letter key={i} bg={color} isSubmiting={Boolean(color)}>
            {letter}
          </Letter>
        ))}
      </div>
    )
  }

  if (isWriting) {
    const letters = [...currentWord]

    return (
      <div className='flex gap-2'>
        {letters.map((letter, i) => (
          <Letter key={i} isWriting>
            {letter}
          </Letter>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <Letter key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className='flex gap-2'>
      {deafultColums.map((_, i) => (
        <Letter key={i} />
      ))}
    </div>
  )
}

type RowProps = {
  guess?: FormatLetter[]
  currentWord?: string
}
