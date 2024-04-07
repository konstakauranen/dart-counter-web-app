import Login from "../components/login/Login"
import PropTypes from "prop-types"

const SignUpPage = ( {onLogin} ) => {
    return(
        <Login mode='signup' onLogin={onLogin}/>
    )
}

SignUpPage.propTypes = {
    onLogin: PropTypes.func.isRequired,
  }
  
export default SignUpPage