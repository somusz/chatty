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

//the individual messages are mapped using the message templates
    const messageItems = this.props.messages.map( single => {

//if the message type is notification, the system message elements get rendered
      if (single.type === 'postNotification') {
        return (
          <MessageSystem
            key={single.key}
            content={single.content}
          />
        )
      }

//otherwise the message elements
      else {
        return (
          <Message
            key={single.key}
            username={single.username}
            color={single.color}
            content={single.content}
            image={single.image}
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