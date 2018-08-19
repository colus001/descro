import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import logoSvg from '../static/logo.svg'

const Logo = ({ className }) => (
  <Link to="/" className={classNames('Logo', className)}>
    <img alt="descro logo" className="header--logoImage" src={logoSvg} />
  </Link>
)

export default Logo
