import React from 'react';

export default function Message(props){
    return (
    <div>
    <div className="message">
        <span className="message-username">{props.username}</span>
        <span className="message system">{props.notification}</span>
        <span className="message-content">{props.content}</span>
        {/* <span className="message system">{props.notification}</span> */}
    </div>
    {/* <div className="message system"> */}
        {/* <span className="message system">{props.notification}</span> */}
    {/* </div> */}
    </div>
    )
}

