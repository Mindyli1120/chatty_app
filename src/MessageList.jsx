import React, {Component} from 'react';
import Message from './Message.jsx';
import autoscroll from 'autoscroll-react'

// const style = {
//     overflowY: 'scroll',
//     height: '800px'
// }

class MessageList extends Component {
    render() {
        const messageItem = this.props.messages.map(msg => {
            return <Message 
            key={msg.id}
            username={msg.username}
            content={msg.content} />
        })
        return <main className="messages">{messageItem}</main>;
    }
    
}

export default autoscroll (MessageList)