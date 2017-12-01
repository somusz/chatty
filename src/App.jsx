import React, {Component} from 'react';
import Chat from './Chatbar.jsx';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userCount: 0,
      currentUser: 'Anonymous',
      messages: []
    }
    this.onNewMessage = this.onNewMessage.bind(this)
  }

//when new message is coming from the chatbar, the message is passed to the server
  onNewMessage = (message) => {
    this.socket.send(JSON.stringify(message))
  }

  componentDidMount() {
//on component mount, a new websocket is created
    this.socket = new WebSocket("ws://localhost:3001")

//when message is coming in from the server,
//a switch statement routes the message types
    this.socket.onmessage = (message) => {
      const data = JSON.parse(message.data)

//'log' sets the number of online users
      switch (data.message.type) {
        case 'log':
          this.setState({
            userCount: data.count
          })
          break;
//other types will merge into the messages container
        case 'postMessage':
        case 'postNotification':
          this.setState({
            messages: this.state.messages.concat([data.message])
          })
          break;
        default:
          throw new Error('Unknown message type:', data.message.type)
      }

    }
  }

//rendering the sub-components
  render() {
    return (
    <div>
      <Nav userCount={this.state.userCount} />
      <MessageList messages={this.state.messages} />
      <Chat onNewMessage={this.onNewMessage} currentUser={this.state.currentUser} />
    </div>
    );
  }
}


export default App;

