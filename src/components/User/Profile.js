import React, { Component } from 'react'
import { Typography, Button, Grid, Divider, Avatar } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import DeleteForever from '@material-ui/icons/DeleteForever'
import BorderColor from '@material-ui/icons/BorderColor'
import Moment from 'react-moment'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [1,2,3]
    }
  }

  handleDelete = (id) => {
    console.log(id)
  }

  handleEdit = () => {
    console.log("edit")
  }

  renderBlogs = () => {
    return this.state.blogs.map((blog, i) => (
      <Paper className="user-profile-blog">
        <Typography variant="h5" className="serif-2">
          {"How to Eat the Best Fruit (and Not the Bad Fruit)"}
        </Typography>
        <Typography variant="body1">
          {"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."}
        </Typography>
        <Typography variant="subtitle2">
          Lebron James
        </Typography>
        <Typography variant="caption">
          <Moment fromNow>{blog.postTime || 1545813100264}</Moment>
          <span className="dot-divider"></span>
          {blog.timeRead || 10 + " min read"}
        </Typography>
        <Button color="secondary" variant="fab">
          <DeleteForever />
        </Button>
        <Button color="secondary" variant="fab">
          <BorderColor />
        </Button>
      </Paper>
    ))
  }
  
  render() {
    return(
      <React.Fragment>
        <Grid item xs={3}>
          <Avatar alt="User Avatar" className="user-avatar" src="https://avatars1.githubusercontent.com/u/20658926?s=460&v=4"/>
          <Typography variant="h5" className="bold">
            {this.state.username || "User Name"}
          </Typography>
          <Typography variant="subtitle1">
            {this.state.email || "useremail@gmail.com"}
          </Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="h5" className="semi-bold serif-2" gutterBottom>
            Your Blogs
          </Typography>
          <Divider />
          {this.renderBlogs()}
        </Grid>
      </React.Fragment>
    )
  }
}