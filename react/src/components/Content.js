import React, { Component } from 'react';

import './Content.css';

class Content extends Component {
	render() {
		return (
			<div className="container">
				<div className='main-content'>
					<table>
						<thead>
							<tr>
								<th>Contract</th>
								<th>Date</th>
								<th>Status</th>
								<th>Detail</th>
								<th>Fee</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Stephen Curry</td>
								<td>27</td>
								<td>1,91</td>
								<td>Akron, OH</td>
								<td>Akron, OH</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Content;
