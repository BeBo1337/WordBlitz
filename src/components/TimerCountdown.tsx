import { FC, useState, useEffect } from 'react'
import '../assets/TimerCountdown.scss'

interface TimerCountdownProps {
    onTimeOver: Function
    time: number
    calcWpm?: Function
}

function TimerCountdown({ onTimeOver, time, calcWpm }: TimerCountdownProps) {
    const [timeLeft, setTime] = useState(time)
    const [warning, setWarning] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            if (timeLeft === 0) onTimeOver()
            else {
                setTime(timeLeft - 1)
                if (timeLeft <= 10) setWarning(true)
                else setWarning(false)
                if (calcWpm) calcWpm()
            }
        }, 1000)
    }, [timeLeft])

    const calculateTime = (time: number) => {
        let mins = Math.floor(time / 60)
        let secs = time % 60
        let res: string =
            mins.toString().padStart(2, '0') +
            ':' +
            secs.toString().padStart(2, '0')
        return res
    }

    return (
        <div className={warning ? 'timeContainerBlink' : 'timeContainer'}>
            {calculateTime(timeLeft)}
        </div>
    )
}

export default TimerCountdown
