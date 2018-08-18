import React from 'react'
import classNames from 'classnames'

const Loading = ({ className }) => (
  <i className={classNames('fas fa-spinner fa-spin fa-2x', className)} />
)

export default Loading
