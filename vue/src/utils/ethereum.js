import Web3 from 'web3'
import contract from 'truffle-contract'

import { networks } from '../truffle'
import DescroContract from '../build/contracts/Descro.json'

const { web3 } = window

export const getWeb3 = () => new Promise((resolve, reject) => window.addEventListener('load', () => {
  if (process.env.NODE_ENV === 'production' && typeof web3 !== 'undefined') {
    console.log('Injected web3 detected.')

    resolve(new Web3(web3.currentProvider))
    return
  }

  console.log('No web3 instance injected, using Local web3.')
  const { host, port } = (networks && networks.development) || {}
  const providerUrl = process.env.PROVIDER_URL || `http://${host}:${port}`
  const provider = new Web3.providers.HttpProvider(providerUrl)

  resolve(new Web3(provider))
}))

export const getDescro = ((descro) => (web3) => new Promise((resolve, reject) => {
  if (!web3) {
    reject('Web3 not provided')
    return
  }

  if (descro) {
    resolve(descro)
    return
  }

  const descroContract = contract(DescroContract)
  descroContract.setProvider(web3.currentProvider)
  if (typeof descroContract.currentProvider.sendAsync !== 'function') {
    descroContract.currentProvider.sendAsync = function() {
      return descroContract.currentProvider.send.apply(descroContract.currentProvider, arguments)
    }
  }

  web3.eth.getAccounts((error, accounts) => {
    descroContract.deployed()
      .then((instance) => {
        console.info('descro contract initiation completed')
        descro = instance
        resolve(descro)
      })
      .catch(reject)
  })
}))(undefined)

export const initiateContract = () => getWeb3().then(getDescro)
