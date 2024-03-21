import PropTypes from "prop-types"
import "./after-game-stats.css"

const AfterGameStats = ({ onClose, p1stats, p2stats }) => {
  return (
    <div className="popup-container">
      <div className="content">
        <h2 className="popup-header">First to {Math.max(p1stats.legs, p2stats.legs)} legs - 501</h2>
        <div className="stats-container">
          <div className="player-info">
            <h3>{p1stats.name}</h3>
            <p>Legs: {p1stats.legs}</p>
            <p>Three dart average: {p1stats.average}</p>
            <p>Highest finish: {p1stats.highestFinish}</p>
          </div>
          <div className="player-info">
            <h3>{p2stats.name}</h3>
            <p>Legs: {p2stats.legs}</p>
            <p>Three dart average: {p2stats.average}</p>
            <p>Highest finish: {p2stats.highestFinish}</p>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

AfterGameStats.propTypes = {
  onClose: PropTypes.func.isRequired,
  p1stats: PropTypes.shape({
    name: PropTypes.string.isRequired,
    legs: PropTypes.number.isRequired,
    average: PropTypes.string.isRequired,
    highestFinish: PropTypes.number.isRequired,
  }).isRequired,
  p2stats: PropTypes.shape({
    name: PropTypes.string.isRequired,
    legs: PropTypes.number.isRequired,
    average: PropTypes.string.isRequired,
    highestFinish: PropTypes.number.isRequired,
  }).isRequired,
};

export default AfterGameStats
