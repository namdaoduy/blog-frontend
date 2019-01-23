import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'draft-js/dist/Draft.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import * as Showdown from 'showdown';
import '../../assets/styles/user.css';
import history from '../../utils/history';
import Header from '../Common/Header';
import { createBlog, updateBlog, getEdittingBlog } from '../../actions/user';
import * as constants from '../../constants/common';

class BlogEditor extends Component {
  constructor(props) {
    super(props);
    const blog_id = props.match.params.blog_id;
    this.state = {
      id: blog_id || null,
      type: blog_id ? 'edit' : 'new',
      title: '',
      body: 'Your body here',
      isLoading: true,
      error: false,
    };

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
    });
  }

  componentDidMount() {
    const { id, type } = this.state;
    if (type === 'new') {
      this.setState({
        isLoading: false,
        title: '',
        body: 'Your body here',
      });
    } else {
      this.fetchBlog(id);
    }
  }

  handleBodyChange = (body) => {
    this.setState({ body });
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleNew = (_data) => {
    const { title, body } = _data;
    const data = { title, body };
    this.props.createBlog(data)
      .then((res) => {
        console.log(res.success);
        history.push('/user');
      })
      .catch(err => console.log(err));
  }

  handleEdit = (data) => {
    this.props.updateBlog(data)
      .then((res) => {
        console.log(res.success);
        history.push('/user');
      })
      .catch(err => console.log(err));
  }

  validateInput = () => {
    const { title, body } = this.state;
    if (title.length < constants.BLOG_TITLE_LENGTH_MIN
      || title.length > constants.BLOG_TITLE_LENGTH_MAX
      || body.length < constants.BLOG_BODY_LENGTH_MIN
      || body.length > constants.BLOG_BODY_LENGTH_MAX) {
      this.setState({ error: true });
      return false;
    }
    return true;
  }

  renderError = () => {
    const { error } = this.state;
    if (error) {
      return (
        <div>
          Title must be between 10-100 characters.
          Body must be at least 1000 characters
        </div>
      );
    }
    return null;
  }

  onSubmit = () => {
    if (!this.validateInput()) {
      return false;
    }
    const { id, title, body, type } = this.state;
    const data = { id, title, body };
    if (type === 'edit') {
      this.handleEdit(data);
    } else if (type === 'new') {
      this.handleNew(data);
    }
    return true;
  }

  fetchBlog = (id) => {
    this.props.getEdittingBlog(id)
      .then((res) => {
        if (!res.success) return;
        const { edittingBlog } = this.props;
        this.setState({
          isLoading: false,
          title: edittingBlog.title,
          body: edittingBlog.body,
        });
      })
      .catch(err => console.log(err));
  }

  renderEditor = () => {
    const { isLoading, body } = this.state;
    if (isLoading) {
      return null;
    }
    return (
      <ReactMde
        className="md-editor"
        onChange={this.handleBodyChange}
        value={body}
        generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
      />
    );
  }

  render() {
    const { title } = this.state;
    return (
      <div className="user-container">
        <Header />
        <div className="user-inner">
          <div className="editor-container">
            <TextField
              onChange={this.handleTitleChange}
              value={title}
              placeholder="10 - 100 characters"
              required
              id="outlined-required"
              label="Title"
              margin="normal"
              variant="outlined"
            />

            <Button
              variant="contained"
              color="secondary"
              onClick={this.onSubmit}
            >
              Submit
            </Button>

            {this.renderError()}

            {this.renderEditor()}

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  edittingBlog: user.edittingBlog,
});

const mapDispatchToProps = {
  createBlog,
  updateBlog,
  getEdittingBlog,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogEditor);