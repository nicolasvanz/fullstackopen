import { useDispatch, useSelector } from "react-redux"

import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const Anecdotes = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(anecdote => anecdote.content.startsWith(state.filter))
  )
  const dispatch = useDispatch()

  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return (
    <>
    <h2>Anecdotes</h2>
    {orderedAnecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={() => {
          dispatch(voteAnecdote(anecdote.id))
          dispatch(notify(`you voted '${anecdote.content}'`))
        }}
      />
    )}
    </>
  )
}

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

export default Anecdotes