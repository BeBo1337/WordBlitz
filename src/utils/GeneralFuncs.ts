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
