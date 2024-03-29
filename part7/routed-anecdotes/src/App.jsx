import { useEffect, useState } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  initializeAnecdotes,
  createAnecdote,
  deleteAnecdote,
  voteAnecdote
} from './reducers/anecdotes'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to={'/'} style={padding}>
        anecdotes
      </Link>
      <Link to={'/create'} style={padding}>
        create new
      </Link>
      <Link to={'/about/'} style={padding}>
        about
      </Link>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = () => {
    dispatch(voteAnecdote(anecdote.id))
  }

  return (
    <div>
      <p>
        has {anecdote.votes} votes <button onClick={handleVote}>vote</button>
      </p>
      <p>for more info see {anecdote.info}</p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            <button onClick={() => handleDelete(anecdote.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value
    })
  }

  const resetAll = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={resetAll}>
          reset
        </button>
      </form>
    </div>
  )
}

const Notification = () => {
  const message = useSelector((state) => state.notification)
  return <p>{message}</p>
}

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  const addNew = (anecdote) => {
    dispatch(createAnecdote(anecdote))
    navigate('/')
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const anecdoteMatch = useMatch('/anecdotes/:id')
  const anecdote = anecdoteMatch ? anecdoteById(anecdoteMatch.params.id) : null

  if (anecdotes.length === 0) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path="about" element={<About />} />
        <Route path="create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
