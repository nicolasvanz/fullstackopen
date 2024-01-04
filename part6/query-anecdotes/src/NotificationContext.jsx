import { useReducer } from "react"
import { createContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type){
        case 'setMessage':
            return action.payload
        case 'clear':
        default:
            return ''
    }
}

const NofiticationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notificationMessage, setNotificationMessage] = useReducer(notificationReducer, '')

    return (
        <NofiticationContext.Provider value={[notificationMessage, setNotificationMessage]}>
            {props.children}
        </NofiticationContext.Provider>
    )
}

export default NofiticationContext