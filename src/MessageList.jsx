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
        { this.props.users.previous &&
          <MessageSystem current={this.props.users.current} previous={this.props.users.previous} />
        }
      </main>

    );
  }
}
export default MessageList;