import type { FormatLetter } from '@customTypes/format-word'

export default function Keyboard({ usedLetters }: KeyboardProps) {
  return (
    <ul className='flex flex-col gap-y-2'>
      {KEYBOARD_PATTERN.map((row, idx) => (
        <ul
          className='grid grid-flow-col grid-cols-[auto-fit,1fr] items-center gap-x-2 justify-center'
          key={idx}
        >
          {row.map(({ key }, idx) => {
            const color = usedLetters.find(
              ({ letter }) => letter.toLowerCase() === key.toLowerCase()
            )
            const isActive = Boolean(color)

            return (
              <li
                key={idx}
                className={`text-sm md:text-xl py-1 md:px-3 border border-slate-600 dark:border-slate-500 cursor-not-allowed ${
                  isActive ? 'bg-gray-500/60' : ''
                }`}
              >
                <div className=''>{key}</div>
              </li>
            )
          })}
        </ul>
      ))}
    </ul>
  )
}

const KEYBOARD_PATTERN = [
  [
    { key: 'Q' },
    { key: 'W' },
    { key: 'E' },
    { key: 'R' },
    { key: 'T' },
    { key: 'Y' },
    { key: 'U' },
    { key: 'I' },
    { key: 'O' },
    { key: 'P' }
  ],
  [
    { key: 'A' },
    { key: 'S' },
    { key: 'D' },
    { key: 'F' },
    { key: 'G' },
    { key: 'H' },
    { key: 'J' },
    { key: 'K' },
    { key: 'L' }
  ],
  [
    { key: 'Z' },
    { key: 'X' },
    { key: 'C' },
    { key: 'V' },
    { key: 'B' },
    { key: 'N' },
    { key: 'M' }
  ]
]

type KeyboardProps = {
  usedLetters: FormatLetter[]
}
