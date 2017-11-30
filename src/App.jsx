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

  onNewMessage = (message) => {
    this.socket.send(JSON.stringify(message))
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onmessage = (message) => {
      const data = JSON.parse(message.data)

      switch (data.message.type) {
        case 'log':
          this.setState({
            userCount: data.count
          })
          break;
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

