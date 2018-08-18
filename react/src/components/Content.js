import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom"

import EscrowListContainer from '../containers/EscrowListContainer'
import DetailContainer from '../containers/DetailContainer'
import Welcome from '../modules/Welcome'
import LatestEscrows from '../modules/LatestEscrows'

import './Content.css'

class Content extends Component {
	render() {
		return (
			<div className="Content">
				<Switch>
					<Route exact path="/" component={Welcome}/>
					<Route path="/activity" component={LatestEscrows}/>
					<Route path="/escrows/:id" component={DetailContainer} />
					<Route exact path="/escrows" component={EscrowListContainer} />
				</Switch>
			</div>
		)
	}
}

export default Content
