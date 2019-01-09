import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Moment from 'react-moment';
import history from '../../utils/history';
import Space from '../Common/Space';

export default class NewBlog extends Component {
  handleClick = () => {
    const { blog } = this.props;
    history.push(`/blog/${blog.id || 0}`);
  }

  render() {
    const { blog } = this.props;

    return (
      <Grid item xs={12}>
        <ButtonBase className="btn-base" onClick={this.handleClick}>
          <Paper className="home-new-blog">
            <Typography variant="h5" className="serif-2">
              {blog.title || 'Blog Title'}
            </Typography>
            <Typography variant="body1" noWrap>
              {blog.body || 'Blog body'}
            </Typography>
            <Space height={20} />
            <Typography variant="subtitle2">
              {blog.author || 'Blog Author'}
            </Typography>
            <Typography variant="caption">
              <Moment fromNow>{Date.parse(blog.created_at) || 1545813100264}</Moment>
              <span className="dot-divider" />
              {blog.timeRead || `${10} min read`}
            </Typography>
          </Paper>
        </ButtonBase>
      </Grid>
    );
  }
}