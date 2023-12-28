import { useSelector } from "react-redux"

const Notification = () => {
  const notificationMessage = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
    {
      !notificationMessage || notificationMessage === ''
      ? null
      : <div style={style}>{notificationMessage}</div>
    }
    </>
  )
}

export default Notification