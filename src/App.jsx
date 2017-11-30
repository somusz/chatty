import React, {Component} from 'react';
import Chat from './Chatbar.jsx';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: { current: 'Anonymous', previous: '' },
      messages: []
    }
    this.onNewMessage = this.onNewMessage.bind(this)
    this.onNewUser = this.onNewUser.bind(this)
  }

  onNewMessage = (message) => {
    this.socket.send(JSON.stringify(message))
  }

  onNewUser = (names) => {
    this.setState({
      users: {
        current: names.currentUser,
        previous: names.previousUser
      }
    })
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onmessage = (message) => {
      this.setState({
        messages: this.state.messages.concat([JSON.parse(message.data)])
      })
    }
  }


  render() {
    return (
    <div>
      <Nav />
      <MessageList messages={this.state.messages} users={this.state.users} />
      <Chat onNewMessage={this.onNewMessage} currentUser={this.state.users.current} onNewUser={this.onNewUser} />
    </div>
    );
  }
}
// this.socket.close() unmount


export default App;

