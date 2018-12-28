import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import history from 'utils/history';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});

const LoadingComponent = name => ({ isLoading, error }) => {
  if (isLoading) {
    console.log(`Loading component... ${name}`);
  } else if (error) {
    console.log(`Loading component error ${name}`, error);
  }
  return null;
};

const Home = Loadable({
  loader: () => import('./Home'),
  loading: LoadingComponent('Home'),
});

const Blog = Loadable({
  loader: () => import('./Blog'),
  loading: LoadingComponent('Blog'),
});

const Login = Loadable({
  loader: () => import('./Login'),
  loading: LoadingComponent('Login'),
});

const User = Loadable({
  loader: () => import('./User'),
  loading: LoadingComponent('User'),
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.getItem('justblog_login_state')
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  renderRoutes() {
    const routes = [
      <Route exact path="/" component={Home} key="home"/>,
      <Route path="/login" render={(props) => 
        <Login {...props} handleLogin={this.handleLogin} />} key="login"/>,
      <Route path="/blog/:blog_id" component={Blog} key="blog"/>,
      <Redirect to="/" key="redirect"/>
    ]

    const routesUser = [
      <Route exact path="/" component={Home} key="home"/>,
      <Route path="/blog/:blog_id" component={Blog} key="blog"/>,
      <Route path="/user" component={User} key="user"/>,
      <Redirect to="/" key="redirect"/>
    ]

    if (!this.state.isLogin) {
      return routes;
    }
    else {
      return routesUser;
    }
  }

  preloadChunks() {
    setTimeout(() => {
      Loadable.preloadAll()
      .then(() => {
        console.log('preload all chunks completed');
      })
      .catch(console.error);
    }, 3000);
  }

  handleLogin = (res) => {
    this.setState({isLogin: true}, async () => {
      localStorage.setItem('justblog_access_token', res.access_token);
      localStorage.setItem('justblog_user_id', res.user_id);
      localStorage.setItem('justblog_login_state', 1)
      return <Redirect to="/user" />
    })
  }

  handleLogout = () => {
    
  }

  componentDidMount() {
    this.preloadChunks();
  }

  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <React.Fragment>
          <CssBaseline />
          <Router history={history}>
            <Switch>
              {this.renderRoutes()}
            </Switch>
          </Router>
        </React.Fragment>
      </JssProvider>
    );
  }
}