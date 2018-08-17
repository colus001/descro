import React, { Component } from 'react'
import { Link } from "react-router-dom"

import { formatDate, formatStatus } from '../utils/formatters'

const DUMMY = [{
	id: 1,
	createdAt: new Date(),
	status: 1,
	description: 'Akron, OH',
	balance: 1,
	fee: 0.01,
}, {
	id: 2,
	createdAt: new Date(),
	status: 3,
	description: 'Akron, OH',
	balance: 10,
	fee: 0.01,
}]

class Activity extends Component {
	render() {
		const escrows = DUMMY

		return (
			<div>
				<h2>Activity</h2>
				<table>
					<thead>
						<tr>
							<th>Contract</th>
							<th>Date</th>
							<th>Status</th>
							<th>Description</th>
							<th>Balance</th>
							<th>Fee</th>
						</tr>
					</thead>
					<tbody>
						{escrows.map((escrow) => (
							<tr key={escrow.id}>
								<td><Link to="escrow/1">{escrow.id}</Link></td>
								<td>{formatDate(escrow.createdAt)}</td>
								<td>{formatStatus(escrow.status)}</td>
								<td>{escrow.description}</td>
								<td>{escrow.balance}</td>
								<td>{escrow.fee}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Activity
