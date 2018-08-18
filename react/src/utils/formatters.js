import { map } from 'lodash'
import { format } from 'date-fns'

export const formatDate = (date) => {
  const dateObject = typeof date === 'object' ? date : new Date(date)
  return format(dateObject, 'YYYY-MM-DD HH:mm')
}

export const STATUS = {
  CREATED: 0,
  DEPOSITED: 1,
  PRODUCT_SENT: 2,
  APPROVED: 3,
  CANCELLED: 4,
  COMPLETED: 5,
  REFUNDED: 6,
  IN_DISPUTE: 7,
}

const STATUS = map(STATUS, (index, key) => ({ index, status: key }))

export const formatStatus = (status) => STATUS[status] && STATUS[status].status
