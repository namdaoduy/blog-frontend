import React, { Component } from 'react'
import { Typography, Grid, ButtonBase } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import Space from './../Common/Space'

export default class NewBlog extends Component {
  render() {
    const blog = this.props.blog || null;
    return(
      <Grid item xs={12}>
        <ButtonBase className="btn-base">
          <Paper className="home-new-blog">
            <Typography variant="h6" className="serif-2">
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
              <span className="dot-divider"></span>
              {blog.timeRead || 10 + " min read"}
            </Typography>
          </Paper>
        </ButtonBase>
      </Grid>
    )
  }
}