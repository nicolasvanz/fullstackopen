import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import BlogList from "./Blog"

describe("<Blog />", () => {
  let container
  const blog = {
    title: "test-title",
    author: "nicolas",
    likes: "42",
    url: "someurl.com",
    user: {
      name: "nicolas",
      username: "nicolas",
    },
    id:"randomidstring"
  }

  beforeEach(() => {
    container = render(
      <BlogList
        blogs={[blog]}
      />
    ).container
  })

  test("initially renders only displaying title and author", async () => {
    const titleAuthorDiv = screen.getByText(`${blog.title} ${blog.author}`)
    expect(() => screen.getByText(blog.url)).toThrow()
    expect(() => screen.getByText(`likes ${blog.likes}`)).toThrow()

    expect(titleAuthorDiv).toBeDefined()
  })
})