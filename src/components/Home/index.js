import React, { Component } from 'react'
import Header from './../Common/Header'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="home-container">
        <Header />
      </div>
    )
  }
}