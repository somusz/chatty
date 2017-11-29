import React, {Component} from 'react';
import Chat from './Chatbar.jsx';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentUser: { name: 'Anonymous' },
      messages: [
        {
          key: '1',
          username: 'bob',
          content: 'first message'
        },
        {
          key: '2',
          username: 'rob',
          content: 'second message'
        }
      ]
    }
    this.onNewMessage = this.onNewMessage.bind(this)
  }

  componentWillMount() {
    console.log('chatty says: app created WebSocket to server')
  }

  onNewMessage = (message) => {
    this.socket.send(JSON.stringify(message))
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onopen = () => {
      console.log('chatty says: onopen')
    }

    this.socket.onmessage = (message) => {
      this.setState({
        messages: this.state.messages.concat([JSON.parse(message.data)])
      })
    }
  }


  render() {
    console.log('rendering app')
    console.log('state when rendering', this.state)
    return (
    <div>
      <Nav />
      <MessageList messages={this.state.messages} />
      <Chat onNewMessage={this.onNewMessage} />
    </div>
    );
  }
}
// this.socket.close() unmount

export default App;

