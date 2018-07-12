import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            content: ""
        }
        this.onContent = this.onContent.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onCurrentUser = this.onCurrentUser.bind(this);
    }
    //creating new messages 
    onContent(event) {
        this.setState({
            content: event.target.value 
        });
    }
    
    onMessage() {
        this.props.onNewMessage(this.state.content);
        this.setState({content: ''});
    }

    //creating new name for current user
    onCurrentUser(event) {
        console.log("28:::", event);
        const currentUser = event.target.value.length === 0 ? {name:'Anonymous'} : {name: event.target.value}
        this.props.onNewCurrentUser(currentUser);
        
    }


    render() {
        const onKeyDown = (event) => {
            if(event.key === 'Enter') {
                this.onMessage();
                event.target.value = "";
            }
        }
        
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)"
                defaultValue={this.props.username}
                onBlur={this.onCurrentUser}
                autoFocus
                />
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

