import { useState } from "react"

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Statistic = ({ text, value }) => <p>{text} {value}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allVotes, setAllVotes] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  const handleVote = (handler) => {
    setAllVotes(allVotes + 1)
    handler()
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button
          onClick={() => handleVote(handleGood)}
          text="Good"
        />
        <Button
          onClick={() => handleVote(handleNeutral)}
          text="Neutral"
        />
        <Button
          onClick={() => handleVote(handleBad)}
          text="Bad"
        />
      </div>
      <h1>Statistics</h1>
      <Statistic
        text="good"
        value={good}
      />
      <Statistic
        text="neutral"
        value={neutral}
      />
      <Statistic
        text="bad"
        value={bad}
      />
      <Statistic
        text="all"
        value={allVotes}
      />
      <Statistic
        text="average"
        value={(good-bad)/allVotes}
      />
      <Statistic
        text="positive"
        value={`${(good*100)/allVotes}%`}
      />

    </div>

  )
}

export default App