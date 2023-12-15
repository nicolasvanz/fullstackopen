import { useDispatch, useSelector } from "react-redux"

import { anecdoteVote } from "../reducers/anecdoteReducer"

const Anecdotes = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return (
    <>
    <h2>Anecdotes</h2>
    {orderedAnecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={() => dispatch(anecdoteVote(anecdote.id))}
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