import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return notificationReducer.getInitialState()
    }
  }
})

export default notificationReducer.reducer

export const notify = (notificationMessage) => {
  return async (dispatch) => {
    dispatch(setNotification(notificationMessage))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const { setNotification, clearNotification } =
  notificationReducer.actions
