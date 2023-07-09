import { useState } from 'react'
import './App.css'
import './assets/GlobalStyles.scss'
import DailyBlitz from './components/DailyBlitz'
import MainMenu from './components/MainMenu'
import { Route, Routes } from 'react-router-dom'
import WordSprint from './components/WordSprint'

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/daily/blitz" element={<DailyBlitz />} />
            <Route path="/sprint" element={<WordSprint />} />
        </Routes>
    )
}

export default App
