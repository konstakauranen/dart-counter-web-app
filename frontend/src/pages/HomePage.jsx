import Feed from "../components/feed/Feed"
import Topbar from "../components/topbar/Topbar"
import PropTypes from "prop-types"

const HomePage = ({ user }) => {
    return(
        <>
        <Topbar/>
        <Feed user={user}/>
        </>
    )
}

HomePage.propTypes = {
    user: PropTypes.object
}
  
export default HomePage