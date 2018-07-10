import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     currentUser: {name: "Bob"},
        //     MessageList: [{
        //         username: "Bob",
        //         content: "Has anyone seen my marbles?",
        //     },
        //     {
        //         username: "Anonymous",
        //         content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        //     }]
        // }
    }
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        )
    }
    
}

export default ChatBar;

