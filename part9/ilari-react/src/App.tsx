import { useEffect, useState } from "react"

import diariesService from "./services/diariesService"
import { DiaryEntry } from "./types"
import DiaryList from "./components/DiaryList"
import NewDiaryForm from  "./components/NewDiaryForm"


const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const fetchDiaries = async () => {
      const fetchedDiaries = await diariesService.getAll()
      setDiaries(fetchedDiaries)
    }
    fetchDiaries()
  }, [])

  return (
    <div>
      <NewDiaryForm />
      <DiaryList diaries={diaries} />
    </div>
  )
}

export default App
