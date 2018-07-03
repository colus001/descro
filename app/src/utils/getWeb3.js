import Web3 from 'web3'

import { networks } from '../truffle'

const { web3 } = window

const getWeb3 = () => new Promise((resolve, reject) => window.addEventListener('load', () => {
  if (process.env.NODE_ENV === 'production' && typeof web3 !== 'undefined') {
    console.log('Injected web3 detected.');

    resolve(new Web3(web3.currentProvider))
    return
  }

  console.log('No web3 instance injected, using Local web3.');
  const { host, port } = (networks && networks.development) || {}
  const providerUrl = process.env.PROVIDER_URL || `http://${host}:${port}`
  const provider = new Web3.providers.HttpProvider(providerUrl)

  resolve(new Web3(provider))
}))

export default getWeb3
