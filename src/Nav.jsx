import React, {Component} from 'react';

class Nav extends Component {
  render() {
    console.log('rendering nav')

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}
export default Nav;