import { words } from '@root/db.json'

export const getRandomWord = (): string => {
  const maxWordsLength = words.length
  const minWordsLength = 1
  const randomIndex = Math.floor(
    Math.random() * (maxWordsLength - minWordsLength) + minWordsLength
  )

  return words[randomIndex]
}
