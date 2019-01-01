import React, { Component } from 'react';
import '../../assets/styles/user.css';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import { Button, TextField } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Header from '../Common/Header';
import theme from '../../constants/theme';
import 'draft-js/dist/Draft.css';
import 'react-mde/lib/styles/css/react-mde-all.css';
import API from '../../services/apis';
import history from '../../utils/history';

export default class BlogEditor extends Component {
  constructor(props) {
    super(props);
    const blog_id = props.match.params.blog_id;
    this.state = {
      id: (blog_id === 'new') ? null : blog_id,
      type: (blog_id === 'new') ? 'new' : 'edit',
      title: 'Your title here',
      body: 'Your body here',
      isLoading: true,
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
        title: 'Your title here',
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
      });
  }

  handleEdit = (data) => {
    const token = localStorage.getItem('justblog_access_token');
    API.putBlog(data.id, data.title, data.body, token)
      .then((res) => {
        console.log(res);
        history.push('/user');
      });
  }

  onSubmit = () => {
    const { id, title, body, type } = this.state;
    const data = { id, title, body };
    console.log(data);
    if (type === 'edit') {
      this.handleEdit(data);
    } else if (type === 'new') {
      this.handleNew(data);
    }
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
    const { title, body } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="user-container">
          <Header />
          <div className="user-inner">
            <div className="editor-container">
              <TextField
                onChange={this.handleTitleChange}
                value={title}
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

              {this.renderEditor()}

            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}