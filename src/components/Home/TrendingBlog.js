import React, { Component } from 'react'
import { Typography, Grid, ButtonBase, Badge } from '@material-ui/core';
import Space from './../Common/Space'
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';

export default class TrendingBlog extends Component {
  render() {
    const blog = this.props.blog || null;
    const rank = this.props.rank || 0;
    return(
      <Grid item xs={12}>
        <ButtonBase className="btn-base">
          <Badge badgeContent={rank} color="secondary" className="badge left">
            <Paper className="home-new-blog">
              <Typography variant="subtitle1" className="serif-2">
                {"How to Eat the Best Fruit (and Not the Bad Fruit)"}
              </Typography>
              <Typography noWrap>
                {"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."}
              </Typography>
              <Typography variant="subtitle2">
                Lebron James
              </Typography>
              <Typography variant="caption">
                <Moment fromNow>{blog.postTime || 1545813100264}</Moment>
                <span className="dot-divider"></span>
                {blog.timeRead || 10 + " min read"}
              </Typography>
            </Paper>
          </Badge>
        </ButtonBase>
      </Grid>
    )
  }
}