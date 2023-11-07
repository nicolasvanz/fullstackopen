const Header = (props) => {  
  return <h1>{props.course}</h1>
}

const Part  = (props) => {
  return <p>{props.title} {props.exercises}</p>
}

const Content = (props) => {
  const titles = props.titles
  const exercises = props.exercises
  return (
    <>
      <Part title={titles[0]} exercises={exercises[0]} />
      <Part title={titles[1]} exercises={exercises[1]} />
      <Part title={titles[2]} exercises={exercises[2]} />
    </>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.exercises}</p>
}

const App = () => {
  const course = "Half stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14
  
  return (
    <>
      <Header course={course} />
      <Content titles={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
      <Total exercises={exercises1+exercises2+exercises3} />
    </>
  )
}

export default App