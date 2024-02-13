interface Course {
  name: string,
  exerciseCount: number
}

interface CourseListProps {
  courseList: Course []
}

interface CourseInfoProps {
  course: Course
}

const CourseInfo = (props: CourseInfoProps) => {
  return (
    <p>
      {props.course.name} {props.course.exerciseCount}
    </p>
  )
}

const CourseList = (props: CourseListProps) => {
  return (
      props.courseList.map(
        course => <CourseInfo key={course.name} course={course}/>
      )
  )
}

export default CourseList