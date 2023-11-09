const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Total = ({ sumOfExercises }) => {
  return <p>Number of exercises {sumOfExercises}</p>
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => 
        <Part 
          key={parts[i].id}
          part={parts[i].name}
          exercises={parts[i].exercises}
        />
      )}
    </div>
  )
}

const Course = ({ course }) => {
  const sumOfExercises = course.parts.map(
    part => part.exercises).reduce(
      (acc, curr) => acc + curr, 0
  )
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sumOfExercises={sumOfExercises}/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App