import { useState } from "react"
import './match-setup.css'
import PropTypes from "prop-types"

const MatchSetup = ({ onSubmit }) => {
    const [opponentName, setOpponentName] = useState('')
    const [numberOfLegs, setNumberOfLegs] = useState(1)

    const handleNameChange = (event) => {
        setOpponentName(event.target.value)
    }

    const handleLegChange = (event) => {
        setNumberOfLegs(parseInt(event.target.value))
    }

    const handleSubmit = () => {
        if (opponentName.trim() === '') {
            return;
        }
        onSubmit(opponentName, numberOfLegs)
    }

    return (
        <div className="setup-container">
            <div className="setup-wrapper">
                <h3 className="setup-header">MATCH SETUP</h3>
                <div className="setup-input-container">
                    <p>Opponent: </p>
                    <input
                        className="opponent-input"
                        type='text'
                        name='opponentName'
                        value={opponentName}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="setup-input-container">
                    <p>First to: </p>
                    <select
                        className="drop-menu"
                        name='numberOfLegs'
                        value={numberOfLegs}
                        onChange={handleLegChange}
                    >
                        <option value={1}>1 legs</option>
                        <option value={2}>2 legs</option>
                        <option value={3}>3 legs</option>
                        <option value={4}>4 legs</option>
                        <option value={5}>5 legs</option>
                        <option value={6}>6 legs</option>
                    </select>
                </div>
                <button 
                    className="setup-button"
                    onClick={handleSubmit}>Start Match
                </button>
            </div>
        </div>
    );
}

MatchSetup.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default MatchSetup
