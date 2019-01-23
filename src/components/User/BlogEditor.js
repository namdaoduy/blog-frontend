import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'draft-js/dist/Draft.css';
import React, { Component } from 'react';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import * as Showdown from 'showdown';
import '../../assets/styles/user.css';
import API from '../../services/apis';
import history from '../../utils/history';
import Header from '../Common/Header';

export default class BlogEditor extends Component {
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

  handleNew = (data) => {
    const token = localStorage.getItem('justblog_access_token');
    API.postBlog(data.title, data.body, token)
      .then((res) => {
        console.log(res);
        history.push('/user');
      })
      .catch(err => console.log(err));
  }

  handleEdit = (data) => {
    const token = localStorage.getItem('justblog_access_token');
    API.putBlog(data.id, data.title, data.body, token)
      .then((res) => {
        console.log(res);
        history.push('/user');
      })
      .catch(err => console.log(err));
  }

  validateInput = () => {
    const { title, body } = this.state;
    if (title.length < 10 || title.length > 100 || body.length < 1000) {
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
    API.getBlogById(id)
      .then((res) => {
        if (!res.success) return;
        this.setState({
          isLoading: false,
          title: res.data.title,
          body: res.data.body,
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