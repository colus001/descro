import React from 'react'
import classNames from 'classnames'

import { formatStatus, STATUS } from '../utils/formatters'

import './StatusBadge.css'

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
    case STATUS.COMPLETED:
      return 'fas fa-check-double'
    case STATUS.REFUNDED:
      return 'fas fa-backward'
    case STATUS.IN_DISPUTE:
      return 'fas fa-exclamation'
    default:
      return ''
  }
}

const StatusBadge = ({ status, showIcon }) => {
  const statusText = formatStatus(status)
  const readableText = statusText && statusText.replace(/_/, ' ')

  return (
    <div
      title={readableText}
      className={classNames('StatusBadge', {
        [`StatusBadge--${statusText && statusText.toLowerCase()}`]: !!status,
      })}
    >
      {showIcon && (
        <i className={getIconName(status)} />
      )}
      {showIcon && ' '}
      {readableText}
    </div>
  )
}

export default StatusBadge
