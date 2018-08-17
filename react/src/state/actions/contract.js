export const SET_CONTRACT = 'SET_CONTRACT'

export const setContract = (contract) => ({
  type: SET_CONTRACT,
  payload: {
    contract,
  }
})
