import React, {Component} from 'react';

class Chat extends Component {

  constructor(props) {
    super(props)

    this.state = {
        username: this.props.currentUser,
        message: '',
        error: ''
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

        let newEntry = {
          message: event.target.value,
          username: this.state.username
        }

        this.setState(newEntry, () => {

          this.props.onNewMessage({

            currentUser: { name: newEntry.username },
            messages: [{
              key: (Math.random() * 10000000).toString().slice(0,7),
              username: newEntry.username,
              content: newEntry.message
            }]
          })
        })
      }
    }
  }

  _onblur(event) {
    this.setState({username: event.target.value})
  }

  render() {
    console.log('rendering chat')

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} onBlur={this._onblur} />

        <input className="chatbar-message" onKeyPress={this._onEnter} placeholder="Type a message and hit ENTER" />
      </footer>

    );
  }
}
export default Chat;




