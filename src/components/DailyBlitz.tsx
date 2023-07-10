import { useState, useEffect, useRef, FC } from 'react'
import { Letter, allowedLetters } from '../models/Letter.type'
import { Word } from '../models/Word.model'
import { scrambleWord } from '../utils/GeneralFuncs'
import { Logger } from 'sass'
import TimerCountdown from './TimerCountdown'
import { MediumPack } from '../models/WordPacks'
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
        console.log(test('when life gives you lemons you make lemonade'))
        if (!letterGroup || !validWords) {
            const LG: string = getLGfromDB().toUpperCase()
            setValidWords(getVWfromDB())
            if (checkLegal(LG)) {
                setLetterGroup(Array.from(LG))
                console.log(LG)
            } else throw new Error('get rekt, letter group invalid')
        }
    }, [])

    useEffect(() => {
        console.log(validWords)
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
        // then return it, in the meantime:
        return [
            { word: 'mag', isUsed: false },
            { word: 'imagine', isUsed: false },
            { word: 'mine', isUsed: false },
            { word: 'in', isUsed: false },
            { word: 'gain', isUsed: false },
            { word: 'image', isUsed: false },
            { word: 'mag', isUsed: false },
            { word: 'man', isUsed: false },
            { word: 'game', isUsed: false },
            { word: 'main', isUsed: false },
            { word: 'mage', isUsed: false },
            { word: 'age', isUsed: false }
        ]
    }

    const checkLegal = (LG: string) => {
        for (let i = 0; i < LG.length; i++) {
            if (!allowedLetters.includes(LG[i] as Letter)) return false
        }
        return true
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!gameOver) setWord(event.target.value.toLowerCase())
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
        //navigate to end result component/s
    }

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
