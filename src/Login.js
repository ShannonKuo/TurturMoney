import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './App.css';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      user: '',
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }
  handleUserChange(e) {
    if (e.key === 'Enter' && this.state.user !== '') {
      this.handleLogin();
    } else {
      this.setState({ user: e.target.value });
    }
  }
  handleLogin() {
    this.setState({ open: false });
    this.props.handleLogin(this.state.user);
  }
  handleOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleLogin}
      />,
    ];
    return (
      <div className="login">
        <RaisedButton
          className="loginButton"
          label="Login"
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Login"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Please enter your user name.
          <TextField
            className="inputUser"
            hintText="user name"
            onChange={this.handleUserChange}
            onKeyDown={this.handleUserChange}
            autoFocus
          />
        </Dialog>
      </div>
    );
  }
}
Login.propTypes = {
};

export default Login;

