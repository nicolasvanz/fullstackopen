export const setFilter = (newFilter) => {
  return {
    type: 'SET_FILTER',
    payload: newFilter,
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export default filterReducer