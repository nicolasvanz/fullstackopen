import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

const App = () => {
  const courseName = "half stack application development"
  const courseParts = [
    {
      name: "fundamentals",
      exerciseCount: 10
    },
    {
      name: "using props to pass data",
      exerciseCount: 7
    },
    {
      name: "deeper type usage",
      exerciseCount: 14
    }
  ]

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseList={courseParts}/>
      <Total total={totalExercises}/>
    </div>
  )
}

export default App
