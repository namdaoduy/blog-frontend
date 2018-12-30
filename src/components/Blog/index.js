import React, { Component } from 'react';
import '../../assets/styles/blog.css';
import { Typography, Grid, IconButton, Tooltip } from '@material-ui/core';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Share from '@material-ui/icons/Share';
import Markdown from 'react-markdown';
import Moment from 'react-moment';
import Header from '../Common/Header';
import theme from '../../constants/theme';
import API from '../../services/apis';

export default class Home extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      id: match.params.blog_id,
      blog: null,
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

  render() {
    const { blog, postTime } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
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
                    <Moment fromNow>{postTime || 1545813100264}</Moment>
                    <span className="dot-divider" />
                    {`${blog.timeRead || 10} min read`}
                  </Typography>
                </div>
              </div>

              <div className="blog-content">
                <div className="blog-content-left">
                  <Toolbar className="blog-btn-list">
                    <Tooltip title="1000" placement="left">
                      <IconButton color="secondary">
                        <FavoriteBorder />
                      </IconButton>
                    </Tooltip>
                    <IconButton color="secondary">
                      <Share />
                    </IconButton>
                  </Toolbar>
                </div>
                <div className="blog-content-right">
                  <Markdown source={blog.body} />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}
