/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react"
import "./feed.css"
import matchesService from "../../services/matchesService"
import PropTypes from "prop-types"

const Feed = ({ user }) => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        matchesService.setToken(user.token)
        const matchesData = await matchesService.getMatches()
        setMatches(matchesData.reverse())
        setLoading(false)
      } catch (error) {
        console.error("Error fetching matches", error)
      }
    }
    fetchMatches()
  }, [])

  return (
    <div className="feed-container">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : matches.length === 0 ? (
        <div>
          <p>You haven't played any matches yet.</p>
        </div>
      ) : (
        matches.map((match) => (
          <div className="post-container" key={match._id}>
            <h2 className="game-type-header">
              First to {Math.max(match.player1Legs, match.player2Legs)} legs
            </h2>
            <div className="stats-container">
              <div className="post-stats-left">
                <h3 className="player-name-header">{match.player1}</h3>
                <p className="legs-won">{match.player1Legs}</p>
                <p>Three dart average: {match.player1Average}</p>
                <p>Highest finish: {match.player1HighestFinish}</p>
              </div>
              <div className="post-stats-right">
                <h3 className="player-name-header">{match.player2}</h3>
                <p className="legs-won">{match.player2Legs}</p>
                <p>Three dart average: {match.player2Average}</p>
                <p>Highest finish: {match.player2HighestFinish}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

Feed.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
}

export default Feed
