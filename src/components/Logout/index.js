import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
  logout = () => {
    localStorage.removeItem('justblog_access_token');
    localStorage.removeItem('justblog_user_id');
    localStorage.removeItem('justblog_login_state');
    return null;
  }

  render() {
    return (
      <div>
        {this.logout()}
        <Redirect to="/" />
      </div>
    );
  }
}