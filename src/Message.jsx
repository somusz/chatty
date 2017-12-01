import React, {Component} from 'react';

class Message extends Component {

  render() {
    const color = {color: this.props.color}
    const image = this.props.image

    if(image) {
      return (
        <div className="message">
          <span className="message-username" style={color}>{this.props.username}</span>
          <div className="message-image-container" dangerouslySetInnerHTML={{__html: image}}></div>
        </div>
      )
    }

    else {
      return (
        <div className="message">
          <span className="message-username" style={color}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      )
    }
  }

}
export default Message;