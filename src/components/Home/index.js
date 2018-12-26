import React, { Component } from 'react'
import Header from './../Common/Header'
import Space from './../Common/Space'
import './../../assets/styles/home.css'
import Paper from '@material-ui/core/Paper';
import { Typography, Button, Grid, Divider } from '@material-ui/core';

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
        <Paper className="home-new-blog">
          <Typography variant="title">
            {"How to Eat the Best Fruit (and Not the Bad Fruit)"}
          </Typography>
          <Typography variant="body1" noWrap>
            {"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."}
          </Typography>
          <Space height={20} />
          <Typography variant="subtitle2">
            Lebron James
          </Typography>
          <Typography>
            
          </Typography>
        </Paper>
      </Grid>
    ))
  }

  render() {
    return(
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
              <Button className="btn-1" variant="text">Write Now</Button>
              <Button className="btn-2" variant="outlined">Make account in seconds</Button>
            </Paper>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h5" className="semi-bold">
              New blogs
            </Typography>
            <Divider />
            <Grid container spacing={10}>
              {this.renderNewBlogs()}
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5" className="semi-bold">
              Trending
            </Typography>
            <Divider />
          </Grid>
          
        </Grid>
      </div>
    )
  }
}