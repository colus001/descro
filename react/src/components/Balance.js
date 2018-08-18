import { isNumber } from 'lodash'
import React, { Component, Fragment } from 'react'
import classNames from 'classnames'

import { getWeb3, weiToEther } from '../utils/ethereum'
import Loading from '../components/Loading'

import './Balance.css'

class Balance extends Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.refresh()
  }

  componentDidUpdate(prevProps) {
    const { address } = this.props
    if (!address || address === prevProps.address) {
      return
    }

    this.refresh()
  }

  refresh = () => {
    this.setState({
      isLoading: true,
    }, () => {
      getWeb3()
        .then((instance) => instance.eth.getBalance(this.props.address))
        .then((balance) => this.props.setBalance(weiToEther(balance)))
        .then(() => this.setState({ isLoading: false }))
    })
  }

  render() {
    const { isLoading } = this.state
    const { balance } = this.props

    return isNumber(balance) && (
      <div className="Balance">
        <i className="fas fa-sync Balance__sync" onClick={this.refresh} />
        <span className="Balance__name">BALANCE</span>
        <div
          className={classNames('Balance__value', {
            'Balance__value--loading': isLoading,
          })}
        >
          {isLoading ? (
            <Loading className="Balance__loading" />
          ) : (
            <Fragment>
              <span className="Balance__value--val">{balance.toFixed(8)}</span>
              <span className="Balance__value--unit">ETH</span>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default Balance
