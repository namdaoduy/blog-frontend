import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import Home from './Home'
import history from 'utils/history';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
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
      <Route path="/login" component={Home} />,
      <Route path="/blog/:blog_id" component={Home} />,
      <Route path="/" component={Home} />,
      <Redirect to="/" />
    ]

    if (!this.state.isLogin) {
      return routes;
    }
    else {
      return [...routes,
        <Route path="/user/blog" component={Home} />
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