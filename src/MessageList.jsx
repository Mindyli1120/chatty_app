import React, {Component} from 'react';
import Message from './Message.jsx';
import autoscroll from 'autoscroll-react'


class MessageList extends Component {
    render() {
        const messageItem = this.props.messages.map(msg => {
            return <Message 
            key={msg.id}
            username={msg.username}
            content={msg.content} 
            notification={msg.notification}/>
        })
        return <main className="messages">{messageItem}</main>;
    }
    
}

export default autoscroll (MessageList)