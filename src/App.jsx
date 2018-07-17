import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: [],
      totalUsers: "",
      color: ""
    }
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewCurrentUser = this.onNewCurrentUser.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);

    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`);
    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
      switch(data.type){
        case "incomingMessage":
          //handle incoming message
          const messages = this.state.messages.concat(data);
          this.setState({messages: messages})
        break;

        case "incomingNotification":
          // handle incoming notification
          const notification = this.state.messages.concat(data);
          this.setState({messages: notification})
        break;

        case "Total Users":
          // handel the total user
          this.setState({totalUsers: data.content});
        break;

        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
        }
      }
  }
  onNewCurrentUser(currentUser) {
    if(this.state.currentUser.name === "" || this.state.currentUser.name === currentUser.name) {
      this.setState({currentUser: currentUser});
    } else {
      const newNotification = {type: "postNotification", content: `${this.state.currentUser.name} has changed their name to ${currentUser.name}`}
      this.socket.send(JSON.stringify(newNotification));
      this.setState({currentUser: currentUser})
    }
    
  }

  onNewMessage(content) {
    const newMessage = { type: "postMessage", username: this.state.currentUser.name, content: content}
    this.socket.send(JSON.stringify(newMessage));

  }

  render() {
    return (
    <div>
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="navbar-users-online">{this.state.totalUsers}</span>
    </nav>
    <MessageList messages={this.state.messages} />
    <ChatBar currentUser={this.state.currentUser} onNewMessage={this.onNewMessage} onNewCurrentUser={this.onNewCurrentUser} />
    </div>
    );
  }
}
export default App ;
