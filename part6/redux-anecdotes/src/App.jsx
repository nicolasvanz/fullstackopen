import Anecdotes from './components/Anecdotes'
import NewAnecdoteForm from './components/NewAnecdoteForm'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <Filter />
      <Anecdotes/>
      <NewAnecdoteForm/>
    </div>
  )
}

export default App