import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
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
  loader: () => import('./User/Profile'),
  loading: LoadingComponent('User'),
});

const BlogEditor = Loadable({
  loader: () => import('./User/BlogEditor'),
  loading: LoadingComponent('BlogEditor'),
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.getItem('justblog_login_state') || false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.preloadChunks();
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  checkLogin() {
    const loginState = localStorage.getItem('justblog_login_state');
    const { isLogin } = this.state;
    if (isLogin === loginState) return;
    this.setState({
      isLogin: loginState,
    });
  }

  renderRoutes() {
    const { isLogin } = this.state;
    const routes = [
      <Route exact path="/" component={Home} key="home" />,
      <Route
        path="/login"
        render={props => <Login {...props} handleLogin={this.handleLogin} />}
        key="login"
      />,
      <Route path="/blog/:blog_id" component={Blog} key="blog" />,
      <Route
        path="/logout"
        render={props => <Home {...props} logout handleLogout={this.handleLogout} />}
        key="logout"
      />,
      <Redirect to="/" key="redirect" />,
    ];

    const routesUser = [
      <Route exact path="/" component={Home} key="home" />,
      <Route path="/blog/:blog_id" component={Blog} key="blog" />,
      <Route path="/user/blog/:blog_id" component={BlogEditor} key="blogEditor" />,
      <Route path="/user" component={User} key="user" />,
      <Route
        path="/logout"
        render={props => <Home {...props} logout handleLogout={this.handleLogout} />}
        key="logout"
      />,
      <Redirect to="/" key="redirect" />,
    ];

    if (!isLogin) {
      return routes;
    }

    return routesUser;
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
    this.setState({ isLogin: true }, async () => {
      localStorage.setItem('justblog_access_token', res.data.access_token);
      localStorage.setItem('justblog_user_id', res.data.user_id);
      localStorage.setItem('justblog_login_state', 1);
      history.push('/user');
    });
  }

  handleLogout = () => {
    this.setState({ isLogin: false }, async () => {
      localStorage.removeItem('justblog_access_token');
      localStorage.removeItem('justblog_user_id');
      localStorage.removeItem('justblog_login_state');
      history.push('/');
    });
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