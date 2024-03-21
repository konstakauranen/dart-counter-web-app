import {useState} from 'react'
import DartCounter from '../components/dartcounter/DartCounter'
import MatchSetup from '../components/matchSetup/MatchSetup'
import Topbar from '../components/topbar/Topbar'
import PropTypes from "prop-types"

const MatchPage = ({ user }) => {
    const[setupComplete, setSetupComplete] = useState(false)
    const[opponentName, setOpponentName] = useState('')
    const[numberOfLegs, setNumberOfLegs] = useState(0)

    const handleSetupComplete = (name, legs) => {
        setOpponentName(name)
        setNumberOfLegs(legs)
        setSetupComplete(true)
    }

    return (
        <>
            <Topbar/>
            {!setupComplete ? (
                <MatchSetup onSubmit={handleSetupComplete}/>
            ):(
                <DartCounter user ={user} opponentName={opponentName} numberOfLegs={numberOfLegs}/>
            )}
        </>
    )
}

MatchPage.propTypes = {
    user: PropTypes.object
}

export default MatchPage