import { useState } from 'react'
import './App.css'
import './assets/GlobalStyles.scss'
import DailyBlitz from './components/DailyBlitz'
import MainMenu from './components/MainMenu'
import { Route, Routes } from 'react-router-dom'

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/daily" element={<DailyBlitz />} />
        </Routes>
    )
}

export default App
