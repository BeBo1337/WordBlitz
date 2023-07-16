import { WordsData } from '../models/WordData.model'
import data from '../models/WordPacks.json'

export const letters = ['I', 'M', 'A', 'G', 'I', 'N', 'E']

export function generateLetterCombinations(letters: string[]): string[] {
    const combinations: string[] = []

    const letterCount: { [letter: string]: number } = {}
    for (const letter of letters) {
        letterCount[letter] = (letterCount[letter] || 0) + 1
    }

    function backtrack(combination: string): void {
        combinations.push(combination)

        for (const letter in letterCount) {
            if (letterCount[letter] > 0) {
                letterCount[letter]--
                backtrack(combination + letter)
                letterCount[letter]++
            }
        }
    }
    //console.log(combinations)
    backtrack('')
    return combinations
}

export function findAllRealWords(combinations: string[]) {
    const res: string[] = []
    const realWords: WordsData = data as WordsData
    for (const combination of combinations) {
        const currLen = combination.length
        if (currLen <= 3 && realWords['1'].includes(combination)) {
            res.push(combination)
        } else if (currLen <= 5 && realWords['2'].includes(combination)) {
            res.push(combination)
        } else if (currLen <= 7 && realWords['3'].includes(combination)) {
            res.push(combination)
        } else if (currLen <= 9 && realWords['4'].includes(combination)) {
            res.push(combination)
        } else if (currLen <= 10 && realWords['5'].includes(combination)) {
            res.push(combination)
        }
    }
    return res
}
