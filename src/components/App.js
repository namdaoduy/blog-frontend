import CssBaseline from '@material-ui/core/CssBaseline';
import { createGenerateClassName, jssPreset, MuiThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import Loadable from 'react-loadable';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import theme from '../constants/theme';
import history from '../utils/history';

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

class App extends Component {

  componentDidMount() {
    this.preloadChunks();
  }

  renderRoutes() {
    const routes = [
      <Route exact path="/" component={Home} key="home" />,
      <Route path="/login" component={Login} key="login" />,
      <Route path="/blog/:blog_id" component={Blog} key="blog" />,
      <Redirect to="/" key="redirect" />,
    ];

    const routesUser = [
      <Route exact path="/" component={Home} key="home" />,
      <Route path="/blog/:blog_id" component={Blog} key="blog" />,
      <Route exact path="/user/blog/new" component={BlogEditor} key="blogNew" />,
      <Route path="/user/blog/:blog_id/edit" component={BlogEditor} key="blogEdit" />,
      <Route path="/user" component={User} key="user" />,
      <Redirect to="/" key="redirect" />,
    ];

    if (!this.props.loggedIn) {
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

  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router history={history}>
            <Switch>
              {this.renderRoutes()}
            </Switch>
          </Router>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  loggedIn: user.loggedIn,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);
