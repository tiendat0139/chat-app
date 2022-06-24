import React, { useState } from "react";
import { Link } from 'react-router-dom'
import '../assets/css/join.scss'

const Join = () => {
    const [name, setName] = useState()
    const [room, setRoom] = useState()
    return (
        <div className="join-page">
            <div className="join-form">
                <h4>Hello Again!</h4>
                <h5>Welcome to ChatApp</h5>
               <input className="input" name="name" placeholder="Enter name" value={name || ''}
                    onChange={(e) => setName(e.target.value)}
               />
               <input className="input" name="name" placeholder="Enter roomID" value={room || ''}
                    onChange={(e) => setRoom(e.target.value)}
               />
                <Link onClick={(e) => (!name || !room)? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`} 
                    className='join-btn active'>
                    Create room
                </Link>
                <Link  to={'/join-room'} className='join-btn'> Join room </Link>
            </div>
        </div>

    )
}
export default Join