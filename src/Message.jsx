import React from 'react';

export default function Message(props){
    const color = {color: props.color};
    return (
    <div className="message">
        <span className="message system">{props.notification}</span>
        <span className="message-username" style={color}>{props.username}</span>
        <span className="message-content">{props.content}</span>
    </div>
    )
}

