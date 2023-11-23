const listHelper = require("./test_helper")

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(listHelper.blogs)).toBe(36)
  })
})

describe("favorite blog", () => {
  test("of empty list is {}", () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test("when list has only one blog, equals that blog", () => {
    expect(listHelper.favoriteBlog(listHelper.listWithOneBlog)).toEqual(
      listHelper.listWithOneBlog[0]
    )
  })

  test("of a bigger list is calculated right", () => {
    expect(listHelper.favoriteBlog(listHelper.blogs)).toEqual(
      listHelper.blogs[2]
    )
  })
})

describe("most blogs", () => {
  test("of empty list is {}", () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test("when list has only one blog, equals the author of the blog", () => {
    expect(listHelper.mostBlogs(listHelper.listWithOneBlog)).toEqual({
      author: listHelper.listWithOneBlog[0].author,
      blogs: 1
    })
  })

  test("of a bigger list is calculated right", () => {
    expect(listHelper.mostBlogs(listHelper.blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe("most likes", () => {
  test("of empty list is {}", () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test("when list has only one blog, equals the author of the blog", () => {
    expect(listHelper.mostLikes(listHelper.listWithOneBlog)).toEqual({
      author: listHelper.listWithOneBlog[0].author,
      likes: listHelper.listWithOneBlog[0].likes
    })
  })

  test("of a bigger list is calculated right", () => {
    expect(listHelper.mostLikes(listHelper.blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})