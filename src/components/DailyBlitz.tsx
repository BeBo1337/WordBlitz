import { useState, useEffect, useRef, FC } from 'react'
import { Letter, allowedLetters } from '../models/Letter.type'
import { Word } from '../models/Word.model'
import TimerCountdown from './TimerCountdown'
import {
    generateLetterCombinations,
    letters,
    findAllRealWords
} from '../utils/WordsGeneration'

import { Logger } from 'sass'
import { test } from '../models/EmojiTable'

interface BlitzProps {}

const DailyBlitz: FC<BlitzProps> = ({}: BlitzProps) => {
    const [gameOver, setGameOver] = useState(false)
    const [time, setTime] = useState(30)
    const [score, setScore] = useState(0)
    const [word, setWord] = useState('')
    const [letterGroup, setLetterGroup] = useState<string[]>()
    const [validWords, setValidWords] = useState<Word[]>()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        //console.log(test('when life gives you lemons you make lemonade'))
        if (!letterGroup || !validWords) {
            const LG: string = getLGfromDB().toUpperCase()
            setValidWords(getVWfromDB())
            if (checkLegal(LG)) {
                setLetterGroup(Array.from(LG))
            } else throw new Error('get rekt, letter group invalid')
        }
    }, [])

    useEffect(() => {
        //console.log(validWords)
    }, [score, letterGroup, validWords])

    useEffect(() => {
        if (inputRef.current) inputRef.current.value = ''
    }, [score])

    const getLGfromDB = () => {
        // request the string from DB
        // then return it, in the meantime:
        return 'imagine'
    }

    const getVWfromDB = () => {
        // request the array from DB
        // make a Word[] from it and return it
        // in the meantime:

        const comb: string[] = generateLetterCombinations(letters)
        const allWords: string[] = findAllRealWords(comb)
        console.log(allWords)
        const res: Word[] = []
        for (const w of allWords) {
            res.push({ word: w, isUsed: false })
        }
        return res
    }

    const checkLegal = (LG: string) => {
        for (let i = 0; i < LG.length; i++) {
            if (!allowedLetters.includes(LG[i] as Letter)) return false
        }
        return true
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!gameOver) setWord(event.target.value.toUpperCase())
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (!e) {
            return
        }
        if (e.key === 'Enter') {
            handleEnterPress()
        }
    }

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress)
        return () => window.removeEventListener('keypress', handleKeyPress)
    }, [handleKeyPress])

    const handleEnterPress = () => {
        if (validWords && included() && !gameOver) {
            setScore(score + word.length)
        }
    }

    const included = () => {
        //checks if the word entered is in validWords array and also wasn't used
        let res = false
        validWords?.forEach((e) => {
            if (e.word === word && !e.isUsed) {
                e.isUsed = true
                res = true
            }
            if (res) return
        })
        return res
    }

    const onTimeOver = () => {
        setGameOver(true)
    }

    useEffect(() => {
        // if (gameOver) {
        //   alert('RIP')
        //navigate to end result component/s
        // }
    }, [gameOver])

    return (
        <div>
            <TimerCountdown onTimeOver={onTimeOver} time={time} />
            <h1>{`{ ${letterGroup} }`}</h1>
            <input
                ref={inputRef}
                name="inputWord"
                type="text"
                placeholder="Enter words"
                onChange={handleInputChange}
            />
            <h2>score: {score}</h2>
        </div>
    )
}

export default DailyBlitz
