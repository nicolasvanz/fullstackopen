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

export const notify = (dispatch, notificationMessage) => {
  dispatch(setNotification(notificationMessage))
  setTimeout(() => {
    dispatch(clearNotitication())
  }, 5000)
}

export default notificationReducer.reducer
export const { setNotification, clearNotitication } = notificationReducer.actions