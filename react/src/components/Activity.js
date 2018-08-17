import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Activity extends Component {
	render() {
		return (
			<div>
				<h2>Activity</h2>
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
							<td><Link to="escrow/1">1</Link></td>
							<td>27</td>
							<td>1,91</td>
							<td>Akron, OH</td>
							<td>Akron, OH</td>
						</tr>
						<tr>
							<td><Link to="escrow/1">2</Link></td>
							<td>27</td>
							<td>1,91</td>
							<td>Akron, OH</td>
							<td>Akron, OH</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Activity;
