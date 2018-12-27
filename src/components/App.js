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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }

  renderRoutes() {
    const routes = [
      <Route path="/login" component={Login} key="login"/>,
      <Route path="/blog/:blog_id" component={Blog} key="blog"/>,
      <Route path="/" component={Home} key="home"/>,
      <Redirect to="/" key="redirect"/>
    ]

    if (!this.state.isLogin) {
      return routes;
    }
    else {
      return [...routes,
        <Route path="/user/blogs" component={Home} key="blogs"/>
      ]
    }
  }

  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <React.Fragment>
          <CssBaseline />
          <Router>
            <Switch>
              {this.renderRoutes()}
            </Switch>
          </Router>
        </React.Fragment>
      </JssProvider>
    );
  }
}