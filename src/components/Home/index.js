import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import '../../assets/styles/home.css';
import API from '../../services/apis';
import history from '../../utils/history';
import Header from '../Common/Header';
import NewBlog from './NewBlog';
import TrendingBlog from './TrendingBlog';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBlogs: [],
      trendingBlogs: [],
    };
  }

  componentDidMount() {
    this.fetchNewBlogs();
    this.fetchTrendingBlogs();
  }

  handleWriteNow = () => {
    history.push('/user/blog/new');
  }

  handleMakeAccount = () => {
    history.push('/login');
  }

  renderNewBlogs = () => {
    const { newBlogs } = this.state;
    return newBlogs.map(blog => (
      <NewBlog blog={blog} key={blog.id} />
    ));
  }

  renderTrendingBlogs = () => {
    const { trendingBlogs } = this.state;
    return trendingBlogs.map((blog, i) => (
      <TrendingBlog blog={blog} key={blog.id} rank={i + 1} />
    ));
  }

  fetchNewBlogs = () => {
    API.getAllBlogs()
      .then((res) => {
        if (!res.success) return;
        this.setState({ newBlogs: res.data });
      })
      .catch(err => console.log(err));
  }

  fetchTrendingBlogs = () => {
    API.getTrendingBlogs()
      .then((res) => {
        if (!res.success) return;
        this.setState({ trendingBlogs: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <Grid
          className="home-inner"
          container
          spacing={24}
        >
          <Grid item xs={12}>
            <Paper
              className="home-welcome"
              elevation={5}
            >
              <Typography className="serif" variant="h1" gutterBottom>
                Welcome to Just Blog,
                {' '}
                <br />
                write your story.
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                We’ll deliver the best stories and ideas on the topics you care about most straight to your homepage, app, or inbox.
              </Typography>
              <Button
                className="btn-1"
                variant="contained"
                color="secondary"
                onClick={this.handleWriteNow}
              >
                Write Now
              </Button>
              <Button
                className="btn-2"
                variant="outlined"
                color="secondary"
                onClick={this.handleMakeAccount}
              >
                Make account in seconds
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h5" className="semi-bold serif-2">
              New blogs
            </Typography>
            <Divider />
            <Grid container spacing={24}>
              {this.renderNewBlogs()}
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5" className="semi-bold serif-2">
              Trending
            </Typography>
            <Divider />
            <Grid container spacing={16}>
              {this.renderTrendingBlogs()}
            </Grid>
          </Grid>

        </Grid>
      </div>
    );
  }
}