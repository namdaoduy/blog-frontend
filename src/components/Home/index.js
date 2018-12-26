import React, { Component } from 'react'
import { Typography, Button, Grid, Divider, ButtonBase } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Header from './../Common/Header'
import Space from './../Common/Space'
import './../../assets/styles/home.css'
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import theme from './../../configs/theme'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [1,2,3]
    }
  }

  renderNewBlogs = () => {
    return this.state.blogs.map(blog => (
      <Grid item xs={12}>
        <ButtonBase>
          <Paper className="home-new-blog">
            <Typography variant="title" className="serif-2">
              {"How to Eat the Best Fruit (and Not the Bad Fruit)"}
            </Typography>
            <Typography variant="body1">
              {"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."}
            </Typography>
            <Space height={20} />
            <Typography variant="subtitle2">
              Lebron James
            </Typography>
            <Typography variant="caption">
              <Moment fromNow>{blog.postTime || 1545813100264}</Moment>
              <span class="dot-divider"></span>
              {blog.timeRead || 10 + " min read"}
            </Typography>
          </Paper>
        </ButtonBase>
      </Grid>
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
                <Button className="btn-1" variant="contained" color="secondary">Write Now</Button>
                <Button className="btn-2" variant="outlined" color="secondary">Make account in seconds</Button>
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
            </Grid>
            
          </Grid>
        </div>
      </MuiThemeProvider>
    )
  }
}