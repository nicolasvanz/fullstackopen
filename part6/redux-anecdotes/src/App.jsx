import Anecdotes from './components/Anecdotes'
import NewAnecdoteForm from './components/NewAnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
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