import React from 'react'
import Avatar from '@mui/material/Avatar';
import './header.css'
export const Header = () => {
  return (
    <header>
        <nav>
            <h1>Hp Cloud</h1>
            <div className='avatar'>
               <Avatar style={{background:"blue"}}>M</Avatar>
            </div>
        </nav>
    </header>
  )
}
