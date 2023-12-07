import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import NewBlogForm from "./NewBlogForm"

describe("<NewBlogForm />", () => {
  let container
  let createBlogFn

  const newBlogFormProps = {
    title: "test title",
    author: "test author",
    url: "test url"
  }

  beforeEach(() => {
    createBlogFn = jest.fn()
    container = render(
      <NewBlogForm
        createBlogFn={createBlogFn}
      />
    ).container
  })

  test("submit calls event handler with correct data", async () => {
    const createButton = screen.getByText("create")
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText("title")
    const authorInput = screen.getByPlaceholderText("author")
    const urlInput = screen.getByPlaceholderText("url")

    await user.type(titleInput, newBlogFormProps.title)
    await user.type(authorInput, newBlogFormProps.author)
    await user.type(urlInput, newBlogFormProps.url)
    await user.click(createButton)

    expect(createBlogFn.mock.calls).toHaveLength(1)
    expect(createBlogFn.mock.calls[0][0]).toEqual(newBlogFormProps)
  })
})