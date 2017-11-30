import React, {Component} from 'react';

class Chat extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentUser: this.props.currentUser,
      message: {
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
        alert('say something') //system message
      }

      else {

        this.setState({
          message: {
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
            previousUser: previousUser
          }, () => this.props.onNewUser(this.state))

        }
      }

      else {

        this.setState({
          currentUser: event.target.defaultValue,
          previousUser: previousUser
        }, () => this.props.onNewUser(this.state))

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




