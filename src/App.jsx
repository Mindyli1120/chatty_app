import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    }
    this.onNewMessage = this.onNewMessage.bind(this);
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

    //`ws://${window.location.host}/`
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to Server");
    this.socket.onmessage = event => {
      console.log("received massage on client", event)
      const messages = this.state.messages.concat(JSON.parse(event.data));
    this.setState({messages: messages})
    }
  }
  
  onNewMessage(content) {
    const newMessage = { username: "Bob", content: content}
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    
    return (
    <div>
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
    <MessageList messages={this.state.messages}/>
    <ChatBar currentUser={this.state.currentUser} onNewMessage={this.onNewMessage}/>
    </div>
    );
  }
}
export default App;
