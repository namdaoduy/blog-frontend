import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';


import './../../assets/styles/common-header.css'

export default class Header extends Component {
  render() {
    return(
      <AppBar className="header" position="sticky" color="default">
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
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}