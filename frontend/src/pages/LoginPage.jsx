import Login from "../components/login/Login"
import PropTypes from "prop-types"

const LoginPage = ({ onLogin }) => {
    return(
        <Login mode='login' onLogin={onLogin} />
    )
}
  
LoginPage.propTypes = {
    onLogin: PropTypes.func.isRequired,
  }
  
export default LoginPage