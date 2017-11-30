import React, {Component} from 'react';

class MessageSystem extends Component {
  render() {

    return (
      <div className="message system">
        {this.props.previous} changed his/her name to {this.props.current}
      </div>
    )
  }
}
export default MessageSystem;