import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAll, updateAnecdote } from "./requests"
import { useContext } from "react"
import NofiticationContext from "./NotificationContext"

const App = () => {
  const queryClient = useQueryClient()
  const [notificationMessage, dispatch] = useContext(NofiticationContext)

  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    }
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateMutation.mutate(votedAnecdote)
    dispatch({ type: 'setMessage', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      dispatch({ type: 'clear' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.error) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
