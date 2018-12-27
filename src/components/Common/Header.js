import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './../../assets/styles/common-header.css'
import theme from './../../configs/theme'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorUserMenu: null,
    }
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

  render() {
    return(
      <MuiThemeProvider theme={theme}>
        <AppBar className="header" position="sticky" color="secondary">
          <Toolbar>
            <div className="header-left">
              <IconButton className="header-menu-btn" color="inherit" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>
            </div>
            <div className="header-center">
              <Typography className="header-title serif" variant="h4" color="inherit" noWrap>
                Just Blog
              </Typography>
            </div>
            <div className="header-right">
              <IconButton color="inherit">
                <Badge badgeContent={17} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={this.state.isUserMenuOpen ? 'user-popper' : undefined}
                aria-haspopup="true"
                onClick={this.handleOpenUserMenu}
                color="inherit">
                <AccountCircle />
              </IconButton>
              <Popover 
                id="user-popper"
                open={!!this.state.anchorUserMenu}
                anchorEl={this.state.anchorUserMenu}
                onClose={this.handleCloseUserMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <Typography>
                  Popover
                </Typography>
              </Popover>
            </div>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
      
    )
  }
}