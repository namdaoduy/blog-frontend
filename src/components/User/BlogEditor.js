import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'draft-js/dist/Draft.css';
import React, { Component } from 'react';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { connect } from 'react-redux';
import * as Showdown from 'showdown';
import { createBlog, getEdittingBlog, updateBlog } from '../../actions/user';
import '../../assets/styles/user.css';
import * as constants from '../../constants/common';
import history from '../../utils/history';
import Header from '../Common/Header';

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

  // If create new blog
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

  // If edit an existed blog
  handleEdit = (data) => {
    this.props.updateBlog(data)
      .then((res) => {
        console.log(res.success);
        history.push('/user');
      })
      .catch(err => console.log(err));
  }

  // Check if input is valid
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

  // Submit form
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

  // render error if input is not valid
  renderError = () => {
    const { error } = this.state;
    if (error) {
      return (
        <div style={{ color: 'red' }}>
          {`Title must be between ${constants.BLOG_TITLE_LENGTH_MIN}-${constants.BLOG_TITLE_LENGTH_MAX} characters.
          Body must be between ${constants.BLOG_BODY_LENGTH_MIN}-${constants.BLOG_BODY_LENGTH_MAX} characters`}
        </div>
      );
    }
    return null;
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
              className="editor-title-input"
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