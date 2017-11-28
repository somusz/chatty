import React, {Component} from 'react';

class Chat extends Component {

  constructor(props) {
    super(props)

    this.state = {
        username: '',
        message: '',
        error: ''
    }

    this.onEnter = this.onEnter.bind(this)
  }

  onEnter(event) {
    if (event.key === 'Enter') {

      let newEntry = {
        message: event.target.value,
        username: 'new user'
      }

      this.setState(newEntry, () => {

        this.props.onNewMessage({
          currentUser: this.state.username,
          messages: [{
            key: '003',
            username: this.state.username,
            content: this.state.message
          }]
        })
      })
    }
  }

  render() {
    console.log('rendering chat')

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />

        <input className="chatbar-message" onKeyPress={this.onEnter} placeholder="Type a message and hit ENTER" />
      </footer>

    );
  }
}
export default Chat;




