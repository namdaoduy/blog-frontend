import React, { Component } from 'react';
import { Typography, Button, Grid, Divider, Avatar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DeleteForever from '@material-ui/icons/DeleteForever';
import BorderColor from '@material-ui/icons/BorderColor';
import Moment from 'react-moment';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderBlogs = () => this.props.blogs.map((blog, i) => (
    <Paper className="user-profile-blog">
      <Typography variant="h5" className="serif-2">
        {blog.title || 'Blog title'}
      </Typography>
      <Typography variant="body1" noWrap>
        {blog.body || 'Blog body'}
      </Typography>
      <Typography variant="subtitle2">
        {blog.author || 'Blog author'}
      </Typography>
      <Typography variant="caption">
        <Moment fromNow>{blog.created_at || 1545813100264}</Moment>
        <span className="dot-divider" />
        {blog.timeRead || `${10} min read`}
      </Typography>
      <Button
        color="secondary"
        variant="fab"
        onClick={() => this.props.handleDelete(blog.id)}
      >
        <DeleteForever />
      </Button>
      <Button
        color="secondary"
        variant="fab"
        onClick={() => this.props.handleClickEdit(blog.id)}
      >
        <BorderColor />
      </Button>
    </Paper>
  ))

  render() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Avatar alt="User Avatar" className="user-avatar" src="https://avatars1.githubusercontent.com/u/20658926?s=460&v=4" />
          <Typography variant="h5" className="bold">
            {'User Name'}
          </Typography>
          <Typography variant="subtitle1">
            {'useremail@gmail.com'}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.props.handleClickNew}
          >
            New Blog
          </Button>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="h5" className="semi-bold serif-2" gutterBottom>
            Your Blogs
          </Typography>
          <Divider />
          {this.renderBlogs()}
        </Grid>
      </React.Fragment>
    );
  }
}