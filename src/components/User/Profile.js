import React, { Component } from 'react';
import { Typography, Button, Grid, Divider, Avatar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DeleteForever from '@material-ui/icons/DeleteForever';
import BorderColor from '@material-ui/icons/BorderColor';
import Moment from 'react-moment';
import '../../assets/styles/user.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Header from '../Common/Header';
import theme from '../../constants/theme';
import API from '../../services/apis';
import history from '../../utils/history';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem('justblog_user_id') || null,
      blogs: [],
      user_info: {},
    };
  }

  componentDidMount() {
    const uid = localStorage.getItem('justblog_user_id') || null;
    if (uid) {
      this.setState({ user_id: uid }, () => {
        this.fetchUserInfo();
        setTimeout(() => {
          this.fetchUserBlogs();
        }, 1000);
      });
    }
  }

  fetchUserInfo = () => {
    const { user_id } = this.state;
    API.getUserInfo(user_id)
      .then((res) => {
        this.setState({ user_info: res.data });
      })
      .catch(err => console.log(err));
  }

  fetchUserBlogs = () => {
    const { user_id } = this.state;
    API.getBlogsByUser(user_id)
      .then((res) => {
        this.setState({ blogs: res.data });
      })
      .catch(err => console.log(err));
  }

  handleDelete = (blog_id) => {
    const del = window.confirm('Are you sure to delete?');
    if (!del) return;
    const token = localStorage.getItem('justblog_access_token');
    API.deleteBlogById(blog_id, token)
      .then(() => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  handleClickEdit = (id) => {
    history.push(`/user/blog/${id}`);
  }

  handleClickNew = () => {
    history.push('/user/blog/new');
  }

  renderBlogs = () => {
    const { blogs } = this.state;
    return blogs.slice(0).reverse().map((blog, i) => (
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
          onClick={() => this.handleDelete(blog.id)}
        >
          <DeleteForever />
        </Button>
        <Button
          color="secondary"
          variant="fab"
          onClick={() => this.handleClickEdit(blog.id)}
        >
          <BorderColor />
        </Button>
      </Paper>
    ));
  }

  render() {
    const { user_info } = this.state;
    const { name, email, picture } = user_info;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="user-container">
          <Header />
          <Grid
            className="user-inner"
            container
            spacing={24}
          >
            <Grid item xs={3}>
              <Avatar alt="User Avatar" className="user-avatar" src={picture || null} />
              <Typography variant="h5" className="bold">
                {name || 'User Name'}
              </Typography>
              <Typography variant="subtitle1">
                {email || 'useremail@gmail.com'}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleClickNew}
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
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}