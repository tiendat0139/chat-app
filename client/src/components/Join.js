import React, { useState } from "react";
import { Link } from 'react-router-dom'
import '../assets/css/join.scss'

const Create = () => {
    const [name, setName] = useState()
    const [roomId, setRoomId] = useState()
    return (
        <div className="join-page">
            <div className="join-form">
                <h4>Hello Again!</h4>
                <h5>Welcome to ChatApp</h5>
               <input className="input" name="name" placeholder="Enter name" value={name || ''}
                    onChange={(e) => setName(e.target.value)}
               />
               <input className="input" name="name" placeholder="Enter roomID" value={roomId || ''}
                    onChange={(e) => setRoomId(e.target.value)}
               />
                <Link onClick={(e) => (!name || !roomId)? e.preventDefault() : null} to={`/chat?name=${name}&roomid=${roomId}`} 
                    className='join-btn active'>
                    Join room
                </Link>
                <Link  to={'/join-room'} className='join-btn'> Create room </Link>
            </div>
        </div>

    )
}
export default Create