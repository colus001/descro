import React from 'react'

const Balance = ({ balance }) => (
  <div className="balance-wrap">
    <span className="balance-name">BALANCE</span>
    <div className="balance-value">
      <span className="balance-value--val">{balance.toFixed(8)}</span>
      <span className="balance-value--unit">ETH</span>
    </div>
  </div>
)

export default Balance
