import React, {Component} from 'react';
import Chat from './Chatbar.jsx';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

      this.setState({
        messages: this.state.messages.concat([data])
      })

    }
  }

  render() {
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

