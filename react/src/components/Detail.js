import React, { Component } from 'react';

class Detail extends Component {
		
  render() {
		const {match} = this.props;
		const {params} = match;

    return (
      <div>
				detail {params.id}
				
				<br/>
				CREATED DEPOSITED PRODUCT_SENT APPROVED CANCELLED COMPLETED REFUNDED
				<br/>
				deposit send product approve cancel withdraw refund
      </div>
    );
  }
}

export default Detail;
