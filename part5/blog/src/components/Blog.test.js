import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import BlogList from "./Blog"

describe("<Blog />", () => {
  let container
  let handleBlogLikeMock

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
    handleBlogLikeMock = jest.fn()
    container = render(
      <BlogList
        blogs={[blog]}
        handleBlogLike={handleBlogLikeMock}
      />
    ).container
  })

  test("initially renders only displaying title and author", async () => {
    const titleAuthorDiv = screen.getByText(`${blog.title} ${blog.author}`)
    expect(() => screen.getByText(blog.url)).toThrow()
    expect(() => screen.getByText(`likes ${blog.likes}`)).toThrow()

    expect(titleAuthorDiv).toBeDefined()
  })

  test("renders likes and url after clicking on the view", async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText("view")

    await user.click(viewButton)

    screen.getByText(`${blog.title} ${blog.author}`)
    screen.getByText(`likes ${blog.likes}`)
    screen.getByText(blog.url)
  })

  test("if like button is clicked twice, the event handler is called twice",
    async () => {
      const user = userEvent.setup()
      const viewButton = screen.getByText("view")

      await user.click(viewButton)

      const likeButton = screen.getByText("like")

      await user.click(likeButton)
      await user.click(likeButton)

      expect(handleBlogLikeMock.mock.calls).toHaveLength(2)
    })
})