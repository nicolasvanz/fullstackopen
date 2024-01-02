import { createSlice } from '@reduxjs/toolkit'


const notificationReducer = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotitication(state, action) {
      return notificationReducer.getInitialState()
    }
  }
})

export default notificationReducer.reducer

export const notify = (notificationMessage) => {
  return async dispatch => {
    dispatch(setNotification(notificationMessage))
    setTimeout(() => {
      dispatch(clearNotitication())
    }, 5000)
  }
}

export const { setNotification, clearNotitication } = notificationReducer.actions