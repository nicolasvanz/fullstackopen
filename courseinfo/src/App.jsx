import React from "react";

const Header = (props) => {  
  return <h1>{props.course.name}</h1>
}

const Part  = (props) => {
  return <p>{props.title} {props.exercises}</p>
}

const Content = (props) => {
  return (<>
      {
        props.parts.map((item, key) =>
         <Part
          key={key}
          title={item.name}
          exercises={item.exercises}
        />
        )
      }
  </>)
}

const Total = (props) => {
  return <p>Number of exercises {props.parts.map(item => item.exercises).reduce(
    (acc, curr) => acc + curr, 0
  )}</p>
}

const App = () => {
  const course = {
      name: "Half stack application development",
      parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </>
  )
}

export default App