import { DiaryEntry } from "../types"

interface DiaryListProps {
  diaries: DiaryEntry[]
}

const DiaryList = (props: DiaryListProps) => {
  return (
    props.diaries.map(diary => {
      return <DiaryInfo key={diary.id} diary={diary} />
    })
  )
}

interface DiaryInfoProps {
  diary: DiaryEntry
}

const DiaryInfo = (props: DiaryInfoProps) => {
  const diary = props.diary
  return (
    <div>
      <h2>{diary.date}</h2>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  )
}

export default DiaryList