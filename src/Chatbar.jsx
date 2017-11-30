import React, {Component} from 'react';

class Chat extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentUser: 'Anonymous',
      message: {
        type: '',
        key: '',
        username: '',
        content: ''
      },
    }

    this._onMessageEnter = this._onMessageEnter.bind(this)
    this._onNameEnter = this._onNameEnter.bind(this)
  }

  _onMessageEnter(event) {
    if (event.key === 'Enter') {

      if (event.target.value === '') {
        alert('say something')
      }

      else {

        this.setState({
          message: {
            type: 'postMessage',
            username: this.state.currentUser,
            content: event.target.value
          } },
        () => {
          this.props.onNewMessage(this.state.message)
        })
      }
    }
  }

  _onNameEnter(event) {
    if (event.key === 'Enter') {

      let previousUser = this.state.currentUser

      if (event.target.value) {

        if (this.state.currentUser !== event.target.value) {

          this.setState({
            currentUser: event.target.value,
            message: {
              type: 'postNotification',
              content: `${previousUser} has changed his/her username to ${event.target.value}`
            }
          }, () => this.props.onNewMessage(this.state.message))

        }
      }

      else {
        if (this.state.currentUser !== event.target.defaultValue) {
          this.setState({
            currentUser: event.target.defaultValue,
            message: {
              type: 'postNotification',
              content: `${previousUser} has changed his/her username to ${event.target.defaultValue}`
            }
          }, () => this.props.onNewMessage(this.state.message))
        }
      }
    }
  }

  render() {

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue="Anonymous" onKeyPress={this._onNameEnter} />

        <input className="chatbar-message" onKeyPress={this._onMessageEnter} placeholder="Type a message and hit ENTER" />
      </footer>

    );
  }
}
export default Chat;




