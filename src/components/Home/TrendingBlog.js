import Badge from '@material-ui/core/Badge';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Moment from 'react-moment';
import history from '../../utils/history';

export default class TrendingBlog extends Component {
  handleClick = () => {
    const { blog } = this.props;
    history.push(`/blog/${blog.id || 0}`);
  }

  render() {
    const { blog, rank } = this.props;
    return (
      <Grid item xs={12}>
        <ButtonBase className="btn-base" onClick={this.handleClick}>
          <Badge badgeContent={rank} color="secondary" className="badge left">
            <Paper className="home-new-blog">
              <Typography variant="subtitle1" className="serif-2">
                {blog.title || 'Blog Title'}
              </Typography>
              <Typography noWrap>
                {blog.body || 'Blog body'}
              </Typography>
              <Typography variant="subtitle2">
                {blog.author || 'Blog Author'}
              </Typography>
              <Typography variant="caption">
                <Moment fromNow>{blog.created_at || 1545813100264}</Moment>
                <span className="dot-divider" />
                {blog.timeRead || `${10} min read`}
              </Typography>
            </Paper>
          </Badge>
        </ButtonBase>
      </Grid>
    );
  }
}