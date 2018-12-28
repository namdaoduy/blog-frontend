import React, { Component } from 'react'
import ReactMde from "react-mde";
import * as Showdown from 'showdown';
import { Typography, Button, Grid, Divider, Avatar, TextField } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper'
import DeleteForever from '@material-ui/icons/DeleteForever'
import BorderColor from '@material-ui/icons/BorderColor'
import Moment from 'react-moment'
import 'draft-js/dist/Draft.css'
import 'react-mde/lib/styles/css/react-mde-all.css';
import API from './../../services/apis'

export default class BlogEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.blog_id || 0,
      title: "Your title here",
      author: ""
    }

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true
    })
  }

  handleBodyChange = (body) => {
    this.setState({ body });
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  onSubmit = () => {
    const { id, title, body } = this.state;
    const data = { id, title, body}
    if (this.props.type === "edit") {
      this.props.handleEdit(data);
    }
    else if (this.props.type === "new") {
      this.props.handleNew(data);
    }
  }

  fetchBlog = (id) => {
    API.getBlogById(id)
    .then(res => {
      if (!res.success) return;
      this.setState({
        title: res.data.title,
        body: res.data.body,
        author: res.data.author
      })
    })
    .catch(err => console.log(err))
  }


  componentDidMount() {
    this.fetchBlog(this.state.id);
  }
  
  render() {
    return(
      <div className="editor-container">
        <TextField
          onChange={this.handleTitleChange}
          value={this.state.title}
          required
          id="outlined-required"
          label="Title"
          margin="normal"
          variant="outlined"
        />

        <Button variant="contained" color="secondary"
          onClick={this.onSubmit}>Submit</Button>

        <ReactMde
          className="md-editor"
          onChange={this.handleBodyChange}
          value={this.state.body}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
        />

      </div>
      
    )
  }
}