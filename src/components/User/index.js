import React, { Component } from 'react'
import './../../assets/styles/user.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Typography, Button, Grid, Divider, Avatar } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Header from './../Common/Header'
import Paper from '@material-ui/core/Paper'
import theme from './../../configs/theme'
import Profile from './Profile'
import BlogEditor from './BlogEditor'

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <MuiThemeProvider theme={theme}>
        <div className="user-container">
          <Header />
          <Grid className="user-inner"
            container spacing={24}>
            <Switch>
              <Route path='/user/blog/new' component={BlogEditor}/>
              <Route path='/user/blog/:blog_id' component={BlogEditor}/>
              <Route path='/user' component={Profile}/>
            </Switch>
          </Grid>
        </div>
      </MuiThemeProvider>
    )
  }
}