import { useEffect, useState } from "react"

import diariesService from "./services/diariesService"
import { DiaryEntry } from "./types"
import DiaryList from "./components/DiaryList"


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
    <DiaryList diaries={diaries} />
  )
}

export default App
