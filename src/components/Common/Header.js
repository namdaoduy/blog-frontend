import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import React, { Component } from 'react';
import '../../assets/styles/common-header.css';
import history from '../../utils/history';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorUserMenu: null,
      isLogin: localStorage.getItem('justblog_login_state') || false,
    };
  }

  handleOpenUserMenu = (e) => {
    this.setState({
      anchorUserMenu: e.currentTarget,
    });
  }

  handleCloseUserMenu = () => {
    this.setState({
      anchorUserMenu: null,
    });
  }

  handleProfile = () => {
    history.push('/user');
  }

  handleLogin = () => {
    history.push('/login');
  }

  handleLogout = () => {
    history.push('/logout');
  }

  handleHome = () => {
    history.push('/');
  }

  render() {
    const { anchorUserMenu, isLogin, isUserMenuOpen } = this.state;
    return (
      <AppBar className="header" position="sticky" color="secondary">
        <Toolbar>
          <div className="header-left" />
          <div className="header-center">
            <ButtonBase onClick={this.handleHome}>
              <Typography className="header-title serif" variant="h4" color="inherit" noWrap>
                Just Blog
              </Typography>
            </ButtonBase>
          </div>
          <div className="header-right">
            <IconButton
              aria-owns={isUserMenuOpen ? 'user-popper' : undefined}
              aria-haspopup="true"
              onClick={this.handleOpenUserMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Popover
              id="user-popper"
              open={!!anchorUserMenu}
              anchorEl={anchorUserMenu}
              onClose={this.handleCloseUserMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {
                !isLogin
                  ? <Button onClick={this.handleLogin}>Login</Button>
                  : (
                    <React.Fragment>
                      <Button onClick={this.handleProfile}>Profile</Button>
                      <Button onClick={this.handleLogout}>Log Out</Button>
                    </React.Fragment>
                  )
              }
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}