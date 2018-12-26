import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';


import './../../assets/styles/common-header.css'

const classes = {};
const isMenuOpen = true;

export default class Header extends Component {
  render() {
    return(
      <AppBar position="sticky" color="default">
        <Toolbar>
          <div className="header-left">
            <IconButton className="header-menu-btn" color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
          </div>
          <div className="header-center">
            <Typography className="header-title" variant="h5" color="inherit" noWrap>
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