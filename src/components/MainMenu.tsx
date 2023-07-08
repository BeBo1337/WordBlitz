import { useState, useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/MainMenu.scss'

interface MainMenuProps {}

function MainMenu({}: MainMenuProps) {
    const navigate = useNavigate()
    return (
        <div className="main-menu">
            <div
                className="menu-item"
                onClick={() => {
                    navigate('/daily')
                }}
            >
                Daily Blitz
            </div>
            <div className="menu-item">Mode #2</div>
            <div className="menu-item">Mode #3</div>
            <div className="menu-item">Mode #4</div>
        </div>
    )
}

export default MainMenu
