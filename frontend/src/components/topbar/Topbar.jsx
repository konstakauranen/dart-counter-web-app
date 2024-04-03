import { Link, useNavigate } from 'react-router-dom'
import './topbar.css'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import LogoutIcon from '@mui/icons-material/Logout'



export default function Topbar() {

    const navigate = useNavigate()
    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        navigate("/login")
    }
    return (
        <div className='topbar-container'>
            <div className='topbar-left'>
                <span className='logo-text'>DART TRACKER</span>
            </div>
        <div className='topbar-center'></div>
        <div className='topbar-right'>
            <Link to='/' className='home-button'>
                <SupervisedUserCircleIcon className="icon"/>
                <span>HOME</span>
            </Link>
            <Link to='/match' className='new-game-button'>
                <AddCircleIcon className="icon"/>
                <span>NEW GAME</span>
            </Link>
            <Link to='/login' className='logout-button' onClick={handleLogout}>
                <LogoutIcon className="icon"/>
                <span>log out</span>
            </Link>
        </div>
    </div>
  )
}
