import React, {Component} from 'react';
import Chat from './Chatbar.jsx';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import WebSocket from 'ws';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [
        {
          key: '1',
          username: 'bob',
          content: 'first message'
        },
        {
          key: '2',
          username: 'kate',
          content: 'second message'
        }
      ]
    }
  this.onNewMessage = this.onNewMessage.bind(this)
  }

  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:3001")

    console.log('chatty says: app created WebSocket to server')

    this.socket.onopen = function(event) {
      console.log('chatty says: connection opened');
      this.socket.send("message to the server");
    }

    this.socket.onmessage = function(message) {
      console.log('chatty says: message received from server')
      var msg = JSON.parse(message.data)
      console.log(msg)
    }

  }
// this.socket.close() unmount

  onNewMessage(messagePack) {

    this.setState({
      currentUser: messagePack.currentUser,
      messages: this.state.messages.concat(messagePack.messages)
    })

  }

  render() {
    console.log('rendering app')
    return (
    <div>
      <Nav />
      <MessageList messages={this.state.messages} />
      <Chat currentUser={this.state.currentUser.name} onNewMessage={this.onNewMessage} />
    </div>
    );
  }
}

export default App;

