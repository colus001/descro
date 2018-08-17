import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import Activity from './Activity';
import Detail from './Detail';
import './Content.css';

class Content extends Component {
	render() {
		return (
			<div className="container">
				<div className='main-content'>
					<Switch>
						<Route exact path="/" component={Activity}/>
						<Route path="/escrow/:id" component={Detail} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default Content;
