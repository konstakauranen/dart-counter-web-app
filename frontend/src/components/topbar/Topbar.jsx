import React from 'react'
import './topbar.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';


export default function Topbar() {
  return (
    <div className='topbar-container'>
        <div className='topbar-left'>
            <span className='logo-text'>PLACEHOLDER</span>
        </div>
        <div className='topbar-center'></div>
        <div className='topbar-right'>
            <button className='home-button'>
                <SupervisedUserCircleIcon className="icon"/>
                <span>HOME</span>
            </button>
            <button className='new-game-button'>
                <AddCircleIcon className="icon"/>
                <span>NEW GAME</span>
            </button>
        </div>
    </div>
  )
}
