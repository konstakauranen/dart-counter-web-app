import React, { useState , useEffect} from 'react'
import ForwardIcon from '@mui/icons-material/Forward'
import AdjustIcon from '@mui/icons-material/Adjust';
import AlbumIcon from '@mui/icons-material/Album';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import './dartcounter.css'

const DartCounter = () => {
    const [p1Score, setP1Score] = useState(501)
    const [p2Score, setP2Score] = useState(501)
    const [p1Legs, setP1Legs] = useState(0)
    const [p2Legs, setP2Legs] = useState(0)
    const [currentPlayer, setCurrentPlayer] = useState(1)
    const [throwScore, setThrowScore] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [p1Avarage, setP1Avarage] = useState(0.0)
    const [p2Avarage, setP2Avarage] = useState(0.0)
    const [p1DartsThrown, setP1DartsThrown] = useState(0)
    const [p2DartsThrown, setP2DartsThrown] = useState(0)
    const [p1HighestFinish, setP1HighestFinish] = useState(0)
    const [p2HighestFinish, setP2HighestFinish] = useState(0)
    const [matchOver, setMatchOver] = useState(false)

    const handleScoreChange = (event) => {
        setThrowScore(event.target.value)
    }

    const handleThrow = () => {
        let finish = 0
        let gameEnded = false

        if (throwScore && !isNaN(throwScore)) {
            const score = parseInt(throwScore)
            const currentPlayerScore = currentPlayer === 1 ? p1Score : p2Score
            const currentPlayerDartsThrown = currentPlayer === 1 ? p1DartsThrown : p2DartsThrown

            if (score > 180 || score < 0 || currentPlayerScore < score) {
                setErrorMessage(`${score} is not possible`)
                return
            }

            if (currentPlayerScore - score === 0) {
                finish = score
                gameEnded = true
            }

            const updatedScore = currentPlayerScore - score
            const updatedDartsThrown = currentPlayerDartsThrown + 3

            if (currentPlayer === 1) {
                setP1Score(updatedScore)
                setP1DartsThrown(updatedDartsThrown)
                setP1Avarage((501 - updatedScore) / (updatedDartsThrown / 3))
                setP1HighestFinish(Math.max(p1HighestFinish, finish))
            }

            if (currentPlayer === 2) {
                setP2Score(updatedScore)
                setP2DartsThrown(updatedDartsThrown)
                setP2Avarage((501 - updatedScore) / (updatedDartsThrown / 3))
                setP2HighestFinish(Math.max(p2HighestFinish, finish))
            }

            setThrowScore('')
            setErrorMessage('')
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
        }
    }

    return (
        <div className='match-container'>
            <div className='counter-container'>
                <div className='player-container'>
                    <h2>KONSTA</h2>
                    <div className='score-container'>
                        <p className='score-text'>{p1Score}</p>
                    </div>
                    <div className='player-stats'>
                        <p>Three dart avarage: {p1Avarage}</p>
                        <p>Darts thrown: {p1DartsThrown}</p>
                        <p>Highest finish: {p1HighestFinish}</p>
                    </div>
                </div>
                <div className='player-container'>
                    <h2>JUSSI</h2>
                    <div className='score-container'>
                        <p className='score-text'>{p2Score}</p>
                    </div>
                    <div className='player-stats'>
                        <p>Three dart avarage: {p2Avarage}</p>
                        <p>Darts thrown: {p2DartsThrown}</p>
                        <p>Highest finish: {p2HighestFinish}</p>
                    </div>
                </div>
            </div>
            <div className='input-container'>
                <input
                    className='throw-input'
                    placeholder='Score'
                    type='text'
                    id='throwScore'
                    value={throwScore}
                    onChange={handleScoreChange}
                />
                <button className='throw-button' onClick={handleThrow}>
                    <ArrowForwardIosIcon className='throw-icon'/>
                </button>
            </div>
            
        </div>
    )
}

export default DartCounter;