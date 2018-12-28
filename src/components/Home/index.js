import React, { Component } from 'react'
import './../../assets/styles/home.css'
import { Typography, Button, Grid, Divider } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Header from './../Common/Header'
import Paper from '@material-ui/core/Paper'
import theme from './../../constants/theme'
import NewBlog from './NewBlog'
import TrendingBlog from './TrendingBlog'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBlogs: [1,2,3],
      trendingBlogs: [1,2,3]
    }
  }

  handleWriteNow = () => {
    this.props.history.push('/user/blog/new');
  }

  handleMakeAccount = () => {
    this.props.history.push('/login');
  }

  renderNewBlogs = () => {
    return this.state.newBlogs.map((blog, i) => (
      <NewBlog blog={blog} key={i}/>
    ))
  }

  renderTrendingBlogs = () => {
    return this.state.trendingBlogs.map((blog, i) => (
      <TrendingBlog blog={blog} key={i} rank={i+1}/>
    ))
  }

  render() {
    return(
      <MuiThemeProvider theme={theme}>
        <div className="home-container">
          <Header />
          <Grid className="home-inner"
            container spacing={24}>
            <Grid item xs={12}>
              <Paper className="home-welcome"
                elevation={5}>
                <Typography className="serif" variant="h1" gutterBottom>
                  Welcome to Just Blog, <br />
                  write your story.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  We’ll deliver the best stories and ideas on the topics you care about most straight to your homepage, app, or inbox.
                </Typography>
                <Button className="btn-1" variant="contained" color="secondary"
                  onClick={this.handleWriteNow}>
                  Write Now
                </Button>
                <Button className="btn-2" variant="outlined" color="secondary"
                  onClick={this.handleMakeAccount}>
                  Make account in seconds
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="h5" className="semi-bold serif-2">
                New blogs
              </Typography>
              <Divider />
              <Grid container spacing={24}>
                {this.renderNewBlogs()}
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h5" className="semi-bold serif-2">
                Trending
              </Typography>
              <Divider />
              <Grid container spacing={16}>
                {this.renderTrendingBlogs()}
              </Grid>
            </Grid>
            
          </Grid>
        </div>
      </MuiThemeProvider>
    )
  }
}