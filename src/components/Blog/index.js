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
import { connect } from 'react-redux';
import { getBlogById, likeBlog } from '../../actions/blog';
import '../../assets/styles/blog.css';
import Header from '../Common/Header';

class Blog extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      id: match.params.blog_id,
    };
  }

  componentDidMount() {
    this.fetchBlog();
  }

  fetchBlog = () => {
    const { id } = this.state;
    this.props.getBlogById(id)
      .then(res => console.log(res.success))
      .catch(err => console.log(err));
  };

  fetchLike = () => {
    const { id } = this.state;
    this.props.likeBlog(id)
      .then(res => console.log(res.success))
      .catch(err => console.log(err));
  }

  onLike = () => {
    const { loggedIn, isLiked } = this.props;
    if (!loggedIn) {
      alert('You have to log in to like blogs.');
    }
    if (isLiked) {
      return;
    }
    this.fetchLike();
  }

  render() {
    const { blogData, isLiked } = this.props;
    return (
      <div className="blog-container">
        <Header />
        <Grid className="blog-inner" container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h3" className="serif-2">
              {blogData.title || 'Blog title'}
            </Typography>

            <div className="blog-info">
              <Avatar
                className="author-avatar"
                alt="Author Avatar"
                src={blogData.picture}
              />
              <div className="blog-info-text">
                <Typography variant="subtitle2">
                  {blogData.author || "Author's Name"}
                </Typography>
                <Typography variant="caption">
                  <Moment fromNow date={blogData.created_at || 1545813100264} />
                  <span className="dot-divider" />
                  {`${blogData.timeRead || 10} min read`}
                </Typography>
              </div>
            </div>

            <div className="blog-content">
              <div className="blog-content-left">
                <Toolbar className="blog-btn-list">
                  <Tooltip title={blogData.like || 0} placement="left">
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
                <Markdown source={blogData.body} className="blog-markdown" />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ blog, user }) => ({
  blogData: blog.blogData,
  isLiked: blog.isLiked,
  loggedIn: user.loggedIn,
});

const mapDispatchToProps = {
  getBlogById,
  likeBlog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
