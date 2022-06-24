/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';
import '../assets/css/chat.scss'
import userAvt from '../assets/img/user.png'
import io from 'socket.io-client'
import Message from './Message'


// eslint-disable-next-line no-unused-vars
let socket;
const ENDPOINT = 'http://localhost:3001'

const Chat = () => {
    const bottomRef = useRef(null)
    const [searchParams] = useSearchParams();
    const [name, setName] = useState('')
    const [roomId, setRoomId] = useState('')
    const [message, setMessage] = useState()
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        setName(searchParams.get('name'))
        setRoomId(searchParams.get('roomid'))
        socket = io(ENDPOINT,{
            withCredentials: true,
            extraHeaders: {
                "my-custom-header" : "abcd" 
            }
        })
        socket.emit('join',{name, roomId}, (error) => {
           if(error) alert(error)
        })
        return () => {
            socket.disconnect();
            socket.off()
        }   
    },[name, roomId, ENDPOINT, searchParams]);
    
    useEffect(() => {
        socket.on('message',  (message) => {
            setMessages(messages => [...messages, message])
        })
    },[socket])

    useEffect(() => {
        axios.get('/users')
        .then((res) => {setUsers(res.data.users)})
    })

    const sendMessage = (e) => {
        e.preventDefault();
        if(message){
            socket.emit('sendMessage', message, (error) => {
                if(error) alert(error)
                setMessage('')
            })
        }
    }
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    },[messages])

    return (
        <div className="chat-page">
            <div className="chat-area row">
                <div className="col-md-1 side-bar"></div>
                <div className="col-md-3 person-onl">
                    <div className="header d-flex justify-content-between">
                        <span className="room-name">Messages</span>
                        <div className="search-icon"><ion-icon name="search-outline"></ion-icon></div>
                    </div>
                    <span className="sub-header">Person Online</span>
                    <div className="person-onl_dis">
                        <ul className="person-onl_list">
                           {users.map((user,id) => (
                                <li className="person-onl_item d-flex justify-content-between align-items-center" key={id}>
                                    <div className="person-onl_inf d-flex align-items-center">
                                        <img className="person-onl_img" src={userAvt} alt="userAvt"></img>
                                        <span className="person_onl_name">{user.name}</span>
                                    </div>
                                    <div className="person_onl_add"><ion-icon name="add-outline"></ion-icon></div>
                                </li>
                           ))}
                        </ul>
                    </div>
                </div>

                <div className="col-md-7 chat-box">
                    <div className="header d-flex justify-content-between align-items-center">
                        <div className="header-room d-flex">
                            <div className="room-img"></div>
                            <div className="room-name d-flex flex-column justify-content-center">
                                <span style={{'fontWeight':'600'}}>{roomId}</span>
                                <span style={{'fontSize':'12px', 'fontWeight':'400', color:'#666'}}>Active Now</span>
                            </div>
                        </div>
                        <div className="header-action">
                            <ion-icon name="call"></ion-icon>
                            <ion-icon name="videocam"></ion-icon>
                        </div>
                    </div>
                    <div className="messages-area" >
                            {messages.map((mess, index) =>
                                <Message key={index} message={{text:mess.text, user: mess.user}} name={name} />
                            )}
                        <div ref={bottomRef}></div>
                    </div>
                    <div className="row chat-form">
                        <div className="col-md-10">
                            <input className="chat-input" type="text"  placeholder="Type your message..." 
                                value={message || ''} onChange={(e) => setMessage(e.target.value) }
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="chat-send" onClick={(e) => sendMessage(e)}
                                onKeyUp ={(e) => e.key==="Enter"? sendMessage(e):null}
                            > 
                            <ion-icon name="send"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 room-info"></div>
            </div>
        </div>
    )
}
export default Chat