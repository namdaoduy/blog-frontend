import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BorderColor from '@material-ui/icons/BorderColor';
import DeleteForever from '@material-ui/icons/DeleteForever';
import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteBlog, getUserBlogs, getUserInfo } from '../../actions/user';
import '../../assets/styles/user.css';
import Auth from '../../utils/auth';
import history from '../../utils/history';
import Header from '../Common/Header';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: Auth.getUserId(),
    };
  }

  componentDidMount() {
    if (this.state.userId) {
      this.fetchUserInfo();
      this.fetchUserBlogs();
    }
  }

  fetchUserInfo = () => {
    const { userId } = this.state;
    this.props.getUserInfo(userId)
      .then((res) => {
        console.log(res.success);
      })
      .catch(err => console.log(err));
  }

  fetchUserBlogs = () => {
    const { userId } = this.state;
    this.props.getUserBlogs(userId)
      .then((res) => {
        console.log(res.success);
      })
      .catch(err => console.log(err));
  }

  handleDelete = (blogId) => {
    const del = window.confirm('Are you sure to delete?');
    if (!del) return;
    this.props.deleteBlog(blogId)
      .then((res) => {
        console.log(res.success);
        this.fetchUserBlogs();
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
    const { userBlogs } = this.props || [];
    return userBlogs.slice(0).reverse().map(blog => (
      <Paper className="user-profile-blog" key={blog.id}>
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
    const { userInfo } = this.props;
    const { name, email, picture } = userInfo;
    return (
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
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userInfo: user.userInfo,
  userBlogs: user.userBlogs,
});

const mapDispatchToProps = {
  getUserInfo,
  getUserBlogs,
  deleteBlog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);