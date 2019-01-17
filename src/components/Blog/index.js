// Check when like

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Share from '@material-ui/icons/Share';
import React, { Component } from 'react';
import Markdown from 'react-markdown';
import Moment from 'react-moment';
import '../../assets/styles/blog.css';
import API from '../../services/apis';
import Header from '../Common/Header';

export default class Blog extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      id: match.params.blog_id,
      blog: {},
      isLiked: false,
    };
  }

  componentDidMount() {
    this.fetchBlog();
  }

  fetchBlog = () => {
    const { id } = this.state;
    API.getBlogById(id)
      .then((res) => {
        if (!res.success) return;
        console.log(res);
        this.setState({ blog: res.data });
      })
      .catch(err => console.log(err));
  };

  fetchLike = () => {
    const { id } = this.state;
    const token = localStorage.getItem('justblog_access_token');
    API.getLikeBlog(id, token)
      .then((res) => {
        if (!res.success) return;
        console.log(res);
        this.setState({ isLiked: true });
      })
      .catch(err => console.log(err));
  }

  onLike = () => {
    const { isLiked } = this.state;
    if (isLiked) {
      return;
    }
    this.fetchLike();
  }

  render() {
    const { blog, isLiked } = this.state;
    return (
      <div className="blog-container">
        <Header />
        <Grid className="blog-inner" container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h3" className="serif-2">
              {blog.title || 'Blog title'}
            </Typography>

            <div className="blog-info">
              <Avatar
                className="author-avatar"
                alt="Author Avatar"
                src={blog.picture}
              />
              <div className="blog-info-text">
                <Typography variant="subtitle2">
                  {blog.author || "Author's Name"}
                </Typography>
                <Typography variant="caption">
                  <Moment fromNow date={blog.created_at || 1545813100264} />
                  <span className="dot-divider" />
                  {`${blog.timeRead || 10} min read`}
                </Typography>
              </div>
            </div>

            <div className="blog-content">
              <div className="blog-content-left">
                <Toolbar className="blog-btn-list">
                  <Tooltip title={blog.like || 0} placement="left">
                    <IconButton
                      color="secondary"
                      onClick={this.onLike}
                    >
                      {isLiked ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Tooltip>
                  <IconButton color="secondary">
                    <Share />
                  </IconButton>
                </Toolbar>
              </div>
              <div className="blog-content-right">
                <Markdown source={blog.body} className="blog-markdown" />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
