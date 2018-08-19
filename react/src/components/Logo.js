import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import logoSvg from '../static/logo.svg'

import './Logo.css'

const Logo = ({ className }) => (
  <Link to="/" className={classNames('Logo', className)}>
    <img alt="descro" src={logoSvg} />
  </Link>
)

export default Logo
