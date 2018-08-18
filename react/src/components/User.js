import React from 'react'
import classNames from 'classnames'

import './User.css'

const User = ({ type, hideText }) => (
  <span
    className="User"
    title={type.toUpperCase()}
  >
    <i
      className={classNames('fas fa-fw', {
        'fa-wallet': type === 'buyer',
        'fa-gift': type === 'seller',
      })}
    />
    {!hideText && (
      <span>{' '} {type}</span>
    )}
  </span>
)

export default User
