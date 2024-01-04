import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"

import  NotificationContext from "../NotificationContext"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatchNotification] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes" ]})
    },
    onError: error => {
      dispatchNotification({ type: 'setMessage', payload: 'too short anecdote, must have length 5 or more'})
    }
  })


  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = { content, votes: 0 }
    newAnecdoteMutation.mutate(newAnecdote)
    dispatchNotification({ type: 'setMessage', payload: `new anecdote created`})
    setTimeout(() => {
      dispatchNotification({ type: 'clear' })
    }, 5000);
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
