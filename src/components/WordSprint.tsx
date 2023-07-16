import { useState, useEffect, useRef, FC } from 'react'
import TimerCountdown from './TimerCountdown'
import { getNextWord, getNumberInRange } from '../utils/GeneralFuncs'
import { Difficulties } from '../utils/Constants'

interface WordSprintProps {}

function WordSprint({}: WordSprintProps) {
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [time, setTime] = useState<number>(30)
    const [score, setScore] = useState<number>(0)
    const [objectiveWord, setObjectiveWord] = useState<string>('')
    const [word, setWord] = useState<string>('')

    const [wordsTyped, setWordsTyped] = useState(0)
    const [startTime, setStartTime] = useState<number>(Date.now())
    const [wpm, setWpm] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = ''
            inputRef.current.focus()
        }
        setWord('')
        setObjectiveWord(
            getNextWord(getNumberInRange(Difficulties.MIN, Difficulties.MAX))
        )
    }, [score])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        calculateWPM()
        if (event.target.value) {
            var len = event.target.value.length
            if (
                event.target.value[len - 1].toUpperCase() !==
                objectiveWord[len - 1]
            ) {
                setGameOver(true)
            }
        }
        if (!gameOver) setWord(event.target.value.toUpperCase())
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (!e) {
            return
        }
        if (e.key === 'Enter') {
            handleEnterPress()
        }
        if (e.key === 'Backspace') {
            setGameOver(true)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [handleKeyPress])

    const handleEnterPress = () => {
        if (objectiveWord === word && !gameOver) {
            setScore(score + word.length)
            setWordsTyped(wordsTyped + 1)
        } else {
            setGameOver(true)
        }
    }

    const onTimeOver = () => {
        setGameOver(true)
    }

    useEffect(() => {
        if (gameOver) {
            alert('RIP')
            //navigate to end result component/s
        }
    }, [gameOver])

    function renderWord() {
        const letters = objectiveWord.split('')

        return letters.map((letter, index) => {
            const isCorrect = index < word.length && word[index] === letter

            return (
                <span
                    key={index}
                    style={{ color: isCorrect ? 'green' : 'white' }}
                >
                    {letter}
                </span>
            )
        })
    }

    const calculateWPM = () => {
        if (startTime !== null && wordsTyped > 0 && !gameOver) {
            const elapsedTime = (Date.now() - startTime) / 1000 // Time in seconds
            const calc = (wordsTyped / elapsedTime) * 60 // Words per minute
            setWpm(Math.round(calc))
        }
    }

    return (
        <div>
            <TimerCountdown
                onTimeOver={onTimeOver}
                time={time}
                calcWpm={calculateWPM}
            />
            <h1>{renderWord()}</h1>
            <input
                ref={inputRef}
                name="inputWord"
                type="text"
                placeholder="Enter the word above"
                onChange={handleInputChange}
            />
            <h2>score: {score}</h2>
            <h2>WPM: {wpm}</h2>
        </div>
    )
}

export default WordSprint
