import React, { Component } from 'react'
import ReactMde from "react-mde";
import * as Showdown from 'showdown';
import { Typography, Button, Grid, Divider, Avatar } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import DeleteForever from '@material-ui/icons/DeleteForever'
import BorderColor from '@material-ui/icons/BorderColor'
import Moment from 'react-moment'
import 'draft-js/dist/Draft.css'
import 'react-mde/lib/styles/css/react-mde-all.css';

export default class BlogEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.blogId || null,
      title: "",
      author: "",
      body: "",
      createdAt: null,
      updatedAt: null
    }

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true
    })
  }

  handleBodyChange = (body) => {
    this.setState({ body });
  };
  
  render() {
    return(
      <ReactMde
        className="md-editor"
        onChange={this.handleBodyChange}
        value={this.state.body}
        generateMarkdownPreview={markdown =>
          Promise.resolve(this.converter.makeHtml(markdown))
        }
      />
    )
  }
}