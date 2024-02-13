import { CoursePart } from "../types"
import { assertNever } from "../utils"

interface CoursePartsProps {
  coursePartList: CoursePart []
}

interface CoursePartInfoProps {
  coursePart: CoursePart
}

const CoursePartInfo = (props: CoursePartInfoProps) => {
  const part = props.coursePart
  switch(part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>{part.description}</i>
        </div>
      )
    case "group":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>project exercises {part.groupProjectCount}</i>
        </div>
      )
    case "background":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>{part.description}</i>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <i>{part.description}</i>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      )
    default:
      assertNever(part)
  }
  return (
    <p>
      {props.coursePart.name} {props.coursePart.exerciseCount}
    </p>
  )
}

const CourseParts = (props: CoursePartsProps) => {
  return (
    props.coursePartList.map(
      part => <CoursePartInfo key={part.name} coursePart={part}/>
    )
  )
}

export default CourseParts