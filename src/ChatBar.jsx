import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
        this.onContent = this.onContent.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }
    onContent(event) {
        this.setState({
            content: event.target.value 
        });
    }
    
    onMessage() {
        this.props.onNewMessage(this.state.content);
        this.setState({content: ''});
    }

    render() {
        const onKeyDown = (event) => {
            if(event.key === 'Enter') {
                console.log("Enter hit!");
                this.onMessage();
                event.target.value = "";
            }
        }
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
                <input className="chatbar-message" 
                placeholder="Type a message and hit ENTER" 
                value={this.content} 
                onChange={this.onContent} 
                onKeyDown={onKeyDown}
                />
            </footer>
        )
    }
    
}

export default ChatBar;

