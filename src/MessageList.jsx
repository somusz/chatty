import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageSystem from './MessageSystem.jsx';

class MessageList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      current: '',
      previous: ''
    }

  }


  render() {

    const messageItems = this.props.messages.map( single => {
      if (single.type === 'postNotification') {
        return (
          <MessageSystem
            key={single.key}
            content={single.content}
          />
        )
      }

      else {
        return (
          <Message
            key={single.key}
            username={single.username}
            content={single.content}
          />
        )
      }
    })

    return (

      <main className="messages">
        { messageItems }
      </main>

    );
  }
}
export default MessageList;