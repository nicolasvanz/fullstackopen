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
  
  export default Course