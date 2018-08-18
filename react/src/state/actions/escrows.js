export const SET_ESCROWS = 'SET_ESCROWS'

export const setEscrows = (asBuyer, asSeller) => ({
  type: SET_ESCROWS,
  payload: {
    asBuyer,
    asSeller,
  },
})
