import './login.css'

const Login = ({ mode }) => {
    const title = mode === 'login' ? 'Login' : 'Create a new user'
    const buttonText = mode === 'login' ? 'Login' : 'Sign up'
    return(
        <div className='login-page'>
            <div className='login-container'>
                <h3>{title}</h3>
                <input
                    className='username-input'
                    placeholder='Username'
                    type='text'
                />
                <input
                    className='password-input'
                    placeholder='Password'
                    type='text'
                />
                <button className='login-button'>
                    {buttonText}
                </button>
            </div>
        </div>
    )
}
  
export default Login