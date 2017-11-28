import React, {Component} from 'react';
import Chat from './Chatbar.jsx';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [
        {
          key: "001",
          username: 'bob',
          content: 'first message'
        },
        {
          key: '002',
          username: 'kate',
          content: 'second message'
        }
      ]
    }
  this.onNewMessage = this.onNewMessage.bind(this)
  }

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
      <Nav name={this.state.appName} />
      <MessageList messages={this.state.messages} />
      <Chat currentUser={this.state.currentUser.name} onNewMessage={this.onNewMessage} />
    </div>
    );
  }
}

export default App;

