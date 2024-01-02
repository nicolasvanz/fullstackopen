import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Anecdotes from './components/Anecdotes'
import NewAnecdoteForm from './components/NewAnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(initialAnecdotes => {
      dispatch(setAnecdotes(initialAnecdotes))
    })
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