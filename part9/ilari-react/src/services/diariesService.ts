import axios from "axios"

import { DiaryEntry, NewDiaryEntry } from "../types"


const baseUrl = "/api/diaries"

const getAll = async () => {
  const response = await axios.get<DiaryEntry []>(baseUrl)
  return response.data
}

const addNew = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>("http://127.0.0.1:3000/api/diaries", newDiary)
  return response.data
}

export default {
  getAll,
  addNew
}