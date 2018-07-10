import React from 'react';
import Message from './Message.jsx';


export default function MessageList(props){
    const messageItem = props.messages.map(msg => {
        return <Message 
        key={msg.id}
        username={msg.username}
        content={msg.content} />
    })
    return <section>{messageItem}</section>;
}