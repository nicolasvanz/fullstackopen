import { useState } from "react"
import { AxiosError } from "axios"

import { Message, NewDiaryEntry, Visibility, Weather } from "../types"
import diariesService from "../services/diariesService"

const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String
}

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(w => w.toString()).includes(param)
}

const parseWeather = (weather: unknown): Weather =>{
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error("invalid weather input")
  }
  return weather
}

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
    throw new Error("invalid visibility input")
  }
  return visibility
}

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(param)
}

const NewDiaryForm = () => {
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility>(Object.values(Visibility)[0])
  const [weather, setWeather] = useState<Weather>(Object.values(Weather)[0])
  const [comment, setComment] = useState<string>("")
  const [message, setMessage] = useState<Message>({ status: "idle" })

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiary: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    }
    await diariesService.addNew(newDiary)
      .then(() => {
        setMessage({ message: "added", status: "success"})
        setTimeout(() => {
          setMessage({ status: "idle" })
        }, 3000)
      })
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
          setMessage({ message: error.response?.data, status: "error" })
          setTimeout(() => {
            setMessage({ status: "idle" })
          }, 3000)
        }
      })
  }
  
  const messageStyle = {
    color: message.status === "error" ? "red" : "green"
  }

  return (
    <div>
      <h2>add new entry</h2>
      <p style={messageStyle}>{message.status === "idle" ? null : message.message }</p>
      <form onSubmit={handleSubmit}>
        date <input value={date} onChange={({ target }) => setDate(target.value)}/>
        <br />
        visibility
        <select value={visibility} onChange={({ target }) => setVisibility(parseVisibility(target.value))}>
          {
            Object.values(Visibility).map(Visibility => {
              return <option key={Visibility} value={Visibility}>{Visibility}</option>
            })
          }
        </select>
        <br />
        weather
        <select value={weather} onChange={({ target }) => setWeather(parseWeather(target.value))}>
          {
            Object.values(Weather).map(weather => {
              return <option key={weather} value={weather}>{weather}</option>
            })
          }
        </select>
        <br />
        comment <input type="text" value={comment} onChange={({ target }) => setComment(target.value)}/>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewDiaryForm