import React, {Component} from 'react';

class Chat extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentUser: 'Anonymous',
      message: {
        key: '',
        username: '',
        content: ''
      },
    }

    this._onEnter = this._onEnter.bind(this)
    this._onblur = this._onblur.bind(this)
  }

  _onEnter(event) {
    if (event.key === 'Enter') {

      if (event.target.value === '') {
        alert('say something') //system message
      }

      else {

        this.setState({
          message: {
            key: (Math.random() * 10000000).toString().slice(0,6),
            username: this.state.currentUser,
            content: event.target.value
          } },
        () => {
          this.props.onNewMessage(this.state.message)
        })
      }
    }
  }

  _onblur(event) {
    if (event.target.value) {
      this.setState( { currentUser: event.target.value })
    }

    else {
      this.setState( { currentUser: event.target.defaultValue })
    }
  }

  render() {
    console.log('rendering chat')

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue="Anonymous" onBlur={this._onblur} />

        <input className="chatbar-message" onKeyPress={this._onEnter} placeholder="Type a message and hit ENTER" />
      </footer>

    );
  }
}
export default Chat;




