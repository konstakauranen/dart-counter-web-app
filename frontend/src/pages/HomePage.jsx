import Feed from "../components/feed/Feed"
import Topbar from "../components/topbar/Topbar"
import PropTypes from "prop-types"

const HomePage = ({ user, onLogout }) => {
    return(
        <>
        <Topbar onLogout={onLogout}/>
        <Feed user={user}/>
        </>
    )
}

HomePage.propTypes = {
    user: PropTypes.object,
    onLogout: PropTypes.func.isRequired
}
  
export default HomePage