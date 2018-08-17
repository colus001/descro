import React, { Component } from 'react'
import HeaderContainer from '../containers/HeaderContainer'
import Content from './Content'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <HeaderContainer />

        <div className="container">
          <Content />
        </div>
      </div>
    )
  }
}

export default App
