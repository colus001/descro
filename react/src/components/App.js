import React, { Component } from 'react';
import Header from './Header';

import './App.css';

type Props = {
  descro: any,
}

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <Header />
        <h1>Welcome to descro</h1>
      </div>
    );
  }
}

export default App;
