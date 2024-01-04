import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notificationMessage, dispatch] = useContext(NotificationContext)
  
  return notificationMessage !== ''
    ?
      <div style={style}>
        {notificationMessage}
      </div>
    :
      null
}

export default Notification
