import { useState, useEffect } from "react"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import "./dartcounter.css"
import AfterGameStats from "../../components/afterGameStats/AfterGameStats"
import matchesService from "../../services/matchesService"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

const DartCounter = ({ user, numberOfLegs, opponentName }) => {
  const [p1Score, setP1Score] = useState(501)
  const [p2Score, setP2Score] = useState(501)
  const [p1Legs, setP1Legs] = useState(0)
  const [p2Legs, setP2Legs] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [throwScore, setThrowScore] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [p1average, setP1average] = useState(0.0)
  const [p2average, setP2average] = useState(0.0)
  const [p1DartsThrown, setP1DartsThrown] = useState(0)
  const [p2DartsThrown, setP2DartsThrown] = useState(0)
  const [p1TotalDartsThrown, setP1TotalDartsThrown] = useState(0)
  const [p2TotalDartsThrown, setP2TotalDartsThrown] = useState(0)
  const [p1TotalScore, setP1TotalScore] = useState(0)
  const [p2TotalScore, setP2TotalScore] = useState(0)
  const [p1HighestFinish, setP1HighestFinish] = useState(0)
  const [p2HighestFinish, setP2HighestFinish] = useState(0)
  const [matchOver, setMatchOver] = useState(false)
  const [startingPlayer, setStartingPlayer] = useState(1)

  const navigate = useNavigate()

  const handleScoreChange = (event) => {
    setThrowScore(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleThrow()
    }
  }

  const handlePopupClose = () => {
    postMatchData()
    navigate("/")
  }

  const handleThrow = () => {
    let finish = 0
    let legEnded = false
    let updatedLegs = 0

    if (throwScore && !isNaN(throwScore)) {
      const score = parseInt(throwScore)
      const currentPlayerScore = currentPlayer === 1 ? p1Score : p2Score
      const currentPlayerDartsThrown =
        currentPlayer === 1 ? p1DartsThrown : p2DartsThrown
      const currentPlayerLegs = currentPlayer === 1 ? p1Legs : p2Legs
      const currentPlayerTotalDarts =
        currentPlayer === 1 ? p1TotalDartsThrown : p2TotalDartsThrown
      const currentPlayerTotalScore =
        currentPlayer === 1 ? p1TotalScore : p2TotalScore

      if (score > 180 || score < 0 || currentPlayerScore < score) {
        setErrorMessage(`${score} is not possible`)
        setTimeout(() => {
          setErrorMessage("")
        }, 3000)
        return
      }

      if (currentPlayerScore - score === 0) {
        finish = score
        legEnded = true
        updatedLegs = currentPlayerLegs + 1
      }

      const updatedScore = currentPlayerScore - score
      const updatedTotalScore = currentPlayerTotalScore + score
      const updatedDartsThrown = currentPlayerDartsThrown + 3
      const updatedTotalDartsThrown = currentPlayerTotalDarts + 3

      if (currentPlayer === 1) {
        setP1Score(updatedScore)
        setP1DartsThrown(updatedDartsThrown)
        setP1TotalDartsThrown(updatedTotalDartsThrown)
        setP1TotalScore(updatedTotalScore)
        setP1average((updatedTotalScore / updatedTotalDartsThrown) * 3)
        setP1HighestFinish(Math.max(p1HighestFinish, finish))
        setP1Legs(Math.max(currentPlayerLegs, updatedLegs))
        if (legEnded) {
          resetScore()
        }
      }
      if (currentPlayer === 2) {
        setP2Score(updatedScore)
        setP2DartsThrown(updatedDartsThrown)
        setP2TotalDartsThrown(updatedTotalDartsThrown)
        setP2TotalScore(updatedTotalScore)
        setP2average((updatedTotalScore / updatedTotalDartsThrown) * 3)
        setP2HighestFinish(Math.max(p2HighestFinish, finish))
        setP2Legs(Math.max(currentPlayerLegs, updatedLegs))
        if (legEnded) {
          resetScore()
        }
      }

      setThrowScore("")
      setErrorMessage("")
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    }
  }

  const resetScore = () => {
    setP1Score(501)
    setP2Score(501)
    setP1DartsThrown(0)
    setP2DartsThrown(0)
    setCurrentPlayer(startingPlayer)
    setStartingPlayer(startingPlayer === 1 ? 2 : 1)
  }

  const postMatchData = async () => {
    try {
      matchesService.setToken(user.token)
      const matchStatistics = {
        player2: opponentName,
        player1Legs: p1Legs,
        player2Legs: p2Legs,
        player1Average: p1average.toFixed(2),
        player2Average: p2average.toFixed(2),
        player1HighestFinish: p1HighestFinish,
        player2HighestFinish: p2HighestFinish,
      }
      await matchesService.createMatch(matchStatistics)
    } catch (error) {
      console.error("Error sending match data", error)
    }
  }

  useEffect(() => {
    if (p1Legs === numberOfLegs || p2Legs === numberOfLegs) {
      setMatchOver(true)
    }
  }, [p1Legs, p2Legs])

  return (
    <div className="match-container">
      <div className="counter-container">
        <div className="player-container">
          <h2>{user.username}</h2>
          <div className="score-container">
            <p className="score-text">{p1Score}</p>
          </div>
          <div className="player-stats">
            <p className="leg-text">Legs: {p1Legs}</p>
            <p>Three dart average: {p1average.toFixed(2)}</p>
            <p>Darts thrown: {p1DartsThrown}</p>
            <p>Highest finish: {p1HighestFinish}</p>
          </div>
        </div>
        <div className="player-container">
          <h2>{opponentName}</h2>
          <div className="score-container">
            <p className="score-text">{p2Score}</p>
          </div>
          <div className="player-stats">
            <p className="leg-text">Legs: {p2Legs}</p>
            <p>Three dart average: {p2average.toFixed(2)}</p>
            <p>Darts thrown: {p2DartsThrown}</p>
            <p>Highest finish: {p2HighestFinish}</p>
          </div>
        </div>
      </div>
      <div className='testi'>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        <div className="input-container">
          <input
            className="throw-input"
            placeholder="Score"
            type="text"
            id="throwScore"
            value={throwScore}
            onChange={handleScoreChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <button className="throw-button" onClick={handleThrow}>
            <ArrowForwardIosIcon className="throw-icon" />
          </button>
        </div>
      </div>
      {matchOver && (
        <AfterGameStats
          onClose={handlePopupClose}
          p1stats={{
            name: user.username,
            legs: p1Legs,
            average: p1average.toFixed(2),
            highestFinish: p1HighestFinish,
          }}
          p2stats={{
            name: opponentName,
            legs: p2Legs,
            average: p2average.toFixed(2),
            highestFinish: p2HighestFinish,
          }}
        />
      )}
    </div>
  )
}

DartCounter.propTypes = {
  user: PropTypes.object.isRequired,
  numberOfLegs: PropTypes.number.isRequired,
  opponentName: PropTypes.string.isRequired,
}

export default DartCounter
