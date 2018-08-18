import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import EscrowListContainer from '../containers/EscrowListContainer'
import Welcome from '../modules/Welcome'
import LatestEscrows from '../modules/LatestEscrows'

import Activity from './Activity'
import Detail from './Detail'

import './Content.css'

class Content extends Component {
  render() {
    return (
      <div className="Content container">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/activity" component={LatestEscrows} />
          <Route path="/escrows/:id" component={Detail} />
          <Route exact path="/escrows" component={EscrowListContainer} />
        </Switch>
      </div>
    )
  }
}

export default Content
