import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Anecdotes from './components/Anecdotes'
import NewAnecdoteForm from './components/NewAnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  })

  return (
    <div>
      <Notification />
      <Filter />
      <Anecdotes/>
      <NewAnecdoteForm/>
    </div>
  )
}

export default App