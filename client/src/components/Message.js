import React from "react";
import '../assets/css/message.scss'

const Message = ({message : {text, user}, name}) => {
    //let isCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    return (
        user === trimmedName?
        <div className="messContainer justifyEnd">
            <p className="send-text">{user}</p>
            <div className="messageBox backgr-blue">
                <p className="messageText" >{text}</p>
            </div>
        </div>
        :
        <div className="messContainer justifyStart">
            <p className="send-text">{user}</p>
            <div className="messageBox backgr-dark">
                <p className="messageText" >{text}</p>
            </div>
        </div>

    )
}

export default Message