const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Total = ({ sumOfExercises }) => {
  return <b>Number of exercises {sumOfExercises}</b>
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
      {parts.map(part => 
        <Part 
          key={part.id}
          part={part.name}
          exercises={part.exercises}
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {courses.map(course => 
        <Course key={course.id} course={course}/>  
      )}
    </>
  )
}

export default App