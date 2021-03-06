import React, {Component} from 'react';

//rendering the nav bar with the user count
class Nav extends Component {
  render() {

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-user">{this.props.userCount} user(s) online</span>
      </nav>
    );
  }
}
export default Nav;