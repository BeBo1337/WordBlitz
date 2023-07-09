import { WordPack } from '../models/WordPack.model'
import { EasyPack, HardPack, MediumPack } from '../models/WordPacks'

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
    switch (difficulty) {
        case 1:
            return getWordFromPack(EasyPack)

        case 2:
            return getWordFromPack(MediumPack)

        case 3:
            return getWordFromPack(HardPack)

        default:
            return getWordFromPack(EasyPack)
    }
}

export function getWordFromPack(wp: WordPack): string {
    var n = getNumberInRange(0, wp.pack.length - 1)
    var word = wp.pack[n]
    wp.pack.splice(n, 1)
    return word.toUpperCase()
}
