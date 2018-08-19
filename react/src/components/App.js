import React, { Component } from 'react'

import HeaderContainer from '../containers/HeaderContainer'
import Content from './Content'
import Footer from './Footer'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <HeaderContainer />
        <div className="App__content">
          <Content />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
