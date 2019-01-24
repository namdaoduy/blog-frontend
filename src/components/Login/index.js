import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { loginGoogle } from '../../actions/user';
import '../../assets/styles/login.css';
import configs from '../../configs';
import history from '../../utils/history';

class Login extends Component {
  responseGoogle = (res) => {
    if (res.error) {
      alert('Login Failed');
    }

    this.props.loginGoogle(res)
      .then((res) => {
        this.handleLogin(res);
      });

    return null;
  }

  handleLogin(res) {
    if (res.success === true) {
      history.push('/user');
    } else {
      alert('Login Failed');
    }
  }

  render() {
    return (
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
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = { loginGoogle };

export default connect(mapStateToProps, mapDispatchToProps)(Login);