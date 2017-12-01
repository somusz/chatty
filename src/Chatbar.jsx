import React, {Component} from 'react';

class Chat extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentUser: this.props.currentUser
    }
    this._onMessageEnter = this._onMessageEnter.bind(this)
    this._onNameEnter = this._onNameEnter.bind(this)
  }

//function for handling enter key presses on the message bar
  _onMessageEnter(event) {
    if (event.key === 'Enter') {

//if nothing entered, the user is alerted
      if (event.target.value === '') {
        alert('say something')
      }

//if something is entered, it get compiled to the current state
//and pushed back in the newMessage function to App.jsx
      else {

        this.setState({
          message: {
            type: 'postMessage',
            username: this.state.currentUser,
            content: event.target.value
          } },
        () => {
          this.props.onNewMessage(this.state)
        })
        event.target.value = ''
      }
    }
  }

//function for handling enter key presses on the username bar
  _onNameEnter(event) {
    if (event.key === 'Enter') {

//on enter press the previous user get distinguished from the current one
      let previousUser = this.state.currentUser

//if there is something entered
      if (event.target.value) {

//the user and message data get updated only if the previous user if different than the current
        if (this.state.currentUser !== event.target.value) {

          this.setState({
            currentUser: event.target.value,
            message: {
              type: 'postNotification',
              content: `${previousUser} has changed his/her username to ${event.target.value}`
            }
          }, () => this.props.onNewMessage(this.state))
        }
      }

//if nothing was entered, the message similarly goes through with the "anonymous" default username
      else {

        if (this.state.currentUser !== event.target.defaultValue) {
          this.setState({
            currentUser: event.target.defaultValue,
            message: {
              type: 'postNotification',
              content: `${previousUser} has changed his/her username to ${event.target.defaultValue}`
            }
          }, () => this.props.onNewMessage(this.state))
        }
      }
    }
  }

//rendering sub-components
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue="Anonymous"
          onKeyPress={this._onNameEnter} />

        <input
          className="chatbar-message"
          onKeyPress={this._onMessageEnter}
          placeholder="Type a message and hit ENTER" />
      </footer>

    );
  }
}
export default Chat;




