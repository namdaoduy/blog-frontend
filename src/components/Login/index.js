import React, { Component } from 'react'
import './../../assets/styles/login.css'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { GoogleLogin } from 'react-google-login'
import configs from './../../configs'

export default class Login extends Component {

  responseGoogle = (res) => {
    console.log(JSON.stringify(res))
  }

  render() {
    return(
      <div className="login-container">
        <Typography variant="h2" className="serif" gutterBottom>
          Just Blog
        </Typography>
        <Paper className="login-paper" elevation={8}>
          <Typography variant="h4" className="serif-2" gutterBottom>
            Join us.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Create an account to personalize your homepage, follow your favorite authors and publications, applaud stories you love, and more.
          </Typography>
          <GoogleLogin
            clientId={configs.googleClientConfigs.web.client_id}
            scope="profile email"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </Paper>
      </div>
    )
  }
}