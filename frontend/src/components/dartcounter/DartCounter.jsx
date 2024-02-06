import React, { useState , useEffect} from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import './dartcounter.css'
import AfterGameStats from '../../components/afterGameStats/AfterGameStats';

const DartCounter = () => {
    const [p1Score, setP1Score] = useState(10)
    const [p2Score, setP2Score] = useState(10)
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

    const handlePopupClose = () => {
        setMatchOver(false)
        resetScore()
        resetLegs()
    }

    const handleThrow = () => {
        let finish = 0
        let legEnded = false
        let updatedLegs = 0

        if (throwScore && !isNaN(throwScore)) {
            const score = parseInt(throwScore)
            const currentPlayerScore = currentPlayer === 1 ? p1Score : p2Score
            const currentPlayerDartsThrown = currentPlayer === 1 ? p1DartsThrown : p2DartsThrown
            const currentPlayerLegs = currentPlayer === 1 ? p1Legs : p2Legs

            if (score > 180 || score < 0 || currentPlayerScore < score) {
                setErrorMessage(`${score} is not possible`)
                return
            }

            if (currentPlayerScore - score === 0) {
                finish = score
                legEnded = true
                updatedLegs = currentPlayerLegs + 1
            }

            const updatedScore = currentPlayerScore - score
            const updatedDartsThrown = currentPlayerDartsThrown + 3

            if (currentPlayer === 1) {
                setP1Score(updatedScore)
                setP1DartsThrown(updatedDartsThrown)
                setP1Avarage((501 - updatedScore) / (updatedDartsThrown / 3))
                setP1HighestFinish(Math.max(p1HighestFinish, finish))
                setP1Legs(Math.max(currentPlayerLegs, updatedLegs))
                if (legEnded) {
                    resetScore()
                }
            }
            if (currentPlayer === 2) {
                setP2Score(updatedScore)
                setP2DartsThrown(updatedDartsThrown)
                setP2Avarage((501 - updatedScore) / (updatedDartsThrown / 3))
                setP2HighestFinish(Math.max(p2HighestFinish, finish))
                setP2Legs(Math.max(currentPlayerLegs, updatedLegs))
                if (legEnded) {
                    resetScore()
                }
            }

            setThrowScore('')
            setErrorMessage('')
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
        }
    }

    const resetScore = () => {
        setP1Score(50)
        setP2Score(501)
        setP1Avarage(0.0)
        setP2Avarage(0.0)
        setP1DartsThrown(0)
        setP2DartsThrown(0)
    }

    const resetLegs = () => {
        setP1Legs(0)
        setP2Legs(0)
        setP1HighestFinish(0)
        setP2HighestFinish(0)
    }

    useEffect(() => {
        if (p1Legs === 3 || p2Legs === 3) {
            setMatchOver(true)
        }
    }, [p1Legs, p2Legs])



    return (
        <div className='match-container'>
            <div className='counter-container'>
                <div className='player-container'>
                    <h2>KONSTA</h2>
                    <div className='score-container'>
                        <p className='score-text'>{p1Score}</p>
                    </div>
                    <div className='player-stats'>
                        <p className='leg-text'>Legs: {p1Legs}</p>
                        <p>Three dart avarage: {p1Avarage.toFixed(2)}</p>
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
                        <p className='leg-text'>Legs: {p2Legs}</p>
                        <p>Three dart avarage: {p2Avarage.toFixed(2)}</p>
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
            {matchOver && (
                <AfterGameStats
                    onClose={handlePopupClose}
                    p1stats = {{
                        legs: p1Legs,
                        avarage: p1Avarage,
                        highestFinish: p1HighestFinish,
                    }}
                    p2stats = {{
                        legs: p2Legs,
                        avarage: p2Avarage,
                        highestFinish: p2HighestFinish,
                    }}
                />
            )}
        </div>
    )
}

export default DartCounter;