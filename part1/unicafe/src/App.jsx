import { useState } from "react"

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </>
  )
}

const Statistics = ({ good, neutral, bad, allVotes }) => {
  if (allVotes === 0)
    return <p>No feedback given</p>
  else
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <StatisticLine
            text="good"
            value={good}
            />
          <StatisticLine
            text="neutral"
            value={neutral}
            />
          <StatisticLine
            text="bad"
            value={bad}
            />
          <StatisticLine
            text="all"
            value={allVotes}
            />
          <StatisticLine
            text="average"
            value={(good-bad)/allVotes}
            />
          <StatisticLine
            text="positive"
            value={`${(good*100)/allVotes}%`}
            />
        </table>
      </>
    )
}

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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allVotes={allVotes}
      />
    </div>

  )
}

export default App