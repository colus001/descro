import { isNumber } from 'lodash'
import React from 'react'
import classNames from 'classnames'

import { formatStatus, STATUS } from '../utils/formatters'

import './Badge.css'

const getIconName = (status) => {
  switch (status) {
    case STATUS.CREATED:
      return 'fas fa-check'
    case STATUS.DEPOSITED:
      return 'fab fa-ethereum'
    case STATUS.PRODUCT_SENT:
      return 'fas fa-truck'
    case STATUS.APPROVED:
      return 'fas fa-clipboard-check'
    case STATUS.CANCELLED:
      return 'fas fa-minus-circle'
    case STATUS.REFUNDED:
      return 'fas fa-fackward'
    case STATUS.IN_DISPUTE:
      return 'fas fa-exclamation'
    default:
      return ''
  }
}

const Badge = ({ status, showIcon }) => (
  <div
    title={formatStatus(status)}
    className={classNames('Badge', {
      [`Badge--${formatStatus(status).toLowerCase()}`]: !!status,
    })}
  >
    {showIcon && (
      <i className={getIconName(status)} />
    )}
    {showIcon && ' '}
    {formatStatus(status)}
  </div>
)

export default Badge
