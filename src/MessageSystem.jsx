import React, {Component} from 'react';

class MessageSystem extends Component {
  render() {

    return (
      <div className="message system">
        <span className="message-content">{this.props.content}</span>
      </div>
    )
  }
}
export default MessageSystem;