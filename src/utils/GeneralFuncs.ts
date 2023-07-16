import { WordsData } from '../models/WordData.model'
import data from '../models/WordPacks.json'

export const getNumberInRange = (start: number, end: number): number => {
    return Math.floor(Math.random() * (end - start + 1)) + start
}

export function scrambleWord(word: string): string {
    const characters = word.split('')

    for (let i = characters.length - 1; i > 0; i--) {
        let j = getNumberInRange(0, i)
        let temp = characters[i]
        characters[i] = characters[j]
        characters[j] = temp
    }

    const scrambledWord = characters.join('')
    console.log(scrambledWord)
    return scrambledWord
}

export function getNextWord(difficulty: number): string {
    const words: string[] = (data as WordsData)[difficulty.toString()]

    if (!words || words.length === 0) {
        // No more words available for the given difficulty level, must be a cheater
        throw new Error('Cheater')
    }
    const randomIndex: number = getNumberInRange(0, words.length - 1)
    const word: string = words[randomIndex]
    words.splice(randomIndex, 1)
    return word
}
