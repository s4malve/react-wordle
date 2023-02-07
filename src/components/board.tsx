import type { UseWordleReturn } from '@hooks/useWordle'

import Row from './row'

export default function Board({ guesses, tries, currentWord }: BoardProps) {
  return (
    <div className='flex flex-col gap-2'>
      {guesses.map((guess, i) => {
        if (tries === i) return <Row key={i} currentWord={currentWord} />

        return <Row key={i} guess={guess} />
      })}
    </div>
  )
}

type BoardProps = {
  guesses: UseWordleReturn['guesses']
  tries: UseWordleReturn['tries']
  currentWord: UseWordleReturn['currentWord']
}
