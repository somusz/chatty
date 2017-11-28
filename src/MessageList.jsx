import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageSystem from './MessageSystem.jsx';

class MessageList extends Component {

  render() {

    console.log('rendering MessageList')

    const messageItems = this.props.messages.map( single => {
      return (
        <Message
          key={single.key}
          username={single.username}
          content={single.content}
        />
      )
    })


    return (

      <main className="messages">
        { messageItems }
        <MessageSystem />
      </main>

    );
  }
}
export default MessageList;