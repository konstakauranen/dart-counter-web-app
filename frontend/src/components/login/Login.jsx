import './login.css'
import { useState } from 'react'
import loginService from '../../services/loginService'
import matchesService from '../../services/matchesService'
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"


const Login = ({ mode, onLogin }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const title = mode === 'login' ? 'Login' : 'Create a new user'
    const buttonText = mode === 'login' ? 'Login' : 'Sign up'
    const linkText = mode === 'login' ? 'Not an user? Click here to ' : 'Already an user? Click here to '
    const linkMode = mode === 'login' ? 'register' : 'login'
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const endpoint = mode === 'login' ? 'login' : 'register'
            const user = await loginService.login({
                username, password,
            }, endpoint)
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            matchesService.setToken(user.token)
            onLogin(user)
            console.log("Login.jsx:", user)
            setUsername('')
            setPassword('')
            navigate("/")
            
        } catch (error) {
            if (mode === 'login') {
                setErrorMessage('Login failed. Please check your credentials.')
            } else {
                setErrorMessage('Username already taken. Please try another.')
            }
            console.error('Login failed')
        }
    }

    return(
        <div className='login-page'>
            <span className='header-container'>
            <h1 className='header-text-1'>DART</h1>
            <h1 className='header-text-2'>TRACKER</h1>
            </span>
            <div className='login-container'>
                <h3>{title}</h3>
                {errorMessage && <p className="login-error-message">{errorMessage}</p>}
                <form className = 'login-form' onSubmit={handleLogin}>
                    <input
                        className='username-input'
                        placeholder='Username'
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <input
                        className="password-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <button className='login-button' type="submit">
                        {buttonText}
                    </button>
                </form>
                <p className="mode-link">
                    {linkText} <a href={`/${linkMode}`}>{linkMode === 'register' ? 'Register' : 'Sign in'}</a>
                </p>
            </div>
        </div>
    )
}

Login.propTypes = {
    mode: PropTypes.oneOf(['login', 'signup']).isRequired,
    onLogin: PropTypes.func.isRequired,
  }
  
export default Login