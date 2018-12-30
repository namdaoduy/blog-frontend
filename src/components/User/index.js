import React, { Component } from 'react';
import '../../assets/styles/user.css';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Header from '../Common/Header';
import theme from '../../constants/theme';
import Profile from './Profile';
import BlogEditor from './BlogEditor';
import API from '../../services/apis';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem('justblog_user_id'),
      blogs: [],
    };
  }

  componentDidMount() {
    this.fetchUserBlogs();
  }

  fetchUserBlogs = () => {
    API.getBlogsByUser(this.state.user_id)
      .then((res) => {
        this.setState({ blogs: res.data });
      });
  }

  handleDelete = (id) => {
    const del = window.confirm('Are you sure to delete?');
    if (!del) return;
    const token = localStorage.getItem('justblog_access_token');
    API.deleteBlogById(id, token)
      .then((res) => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  handleClickEdit = (id) => {
    this.props.history.push(`/user/blog/${id}`);
  }

  handleClickNew = () => {
    this.props.history.push('/user/blog/new');
  }

  handleNew = (data) => {
    const token = localStorage.getItem('justblog_access_token');
    API.postBlog(data.title, data.body, token)
      .then((res) => {
        console.log(res);
        this.props.history.push('/user');
      });
  }

  handleEdit = (data) => {
    const token = localStorage.getItem('justblog_access_token');
    API.putBlog(data.id, data.title, data.body, token)
      .then((res) => {
        console.log(res);
        this.props.history.push('/user');
      });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="user-container">
          <Header />
          <Grid
            className="user-inner"
            container
            spacing={24}
          >
            <Switch>
              <Route
                path="/user/blog/new"
                render={props => (
                  <BlogEditor
                    {...props}
                    type="new"
                    key={`blogNew${Date.now()}`}
                    handleNew={this.handleNew.bind(this)}
                  />
                )}
              />
              <Route
                path="/user/blog/:blog_id"
                render={props => (
                  <BlogEditor
                    {...props}
                    type="edit"
                    key={`blogEdit${Date.now()}`}
                    handleEdit={this.handleEdit.bind(this)}
                  />
                )}
              />
              <Route
                path="/user"
                render={props => (
                  <Profile
                    {...props}
                    key={`profile${Date.now()}`}
                    handleClickNew={this.handleClickNew.bind(this)}
                    handleClickEdit={this.handleClickEdit.bind(this)}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    blogs={this.state.blogs}
                  />
                )}
              />
            </Switch>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}