import React from 'react'
import './after-game-stats.css' 

const AfterGameStats = ({ onClose, p1stats, p2stats }) => {
    return (
        <div className='popup-container'>
            <div className='content'>
                <h2>Best of 3 legs - 501</h2>
                <div className='stats-container'>
                    <div className='player-info'>
                        <h3>Player 1</h3>
                        <p>Legs: {p1stats.legs}</p>
                        <p>Three dart avarage: {p1stats.avarage}</p>
                        <p>Highest finish: {p1stats.highestFinish}</p>
                    </div>
                    <div className='player-info'>
                        <h3>Player 2</h3>
                        <p>Legs: {p2stats.legs}</p>
                        <p>Three dart avarage: {p2stats.avarage}</p>
                        <p>Highest finish: {p2stats.highestFinish}</p>
                    </div>
                </div>
                <button className='close-button' onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default AfterGameStats