const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  const result=listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "sd12k3uh1i4u12ui41g4u",
      title:"Go to Statement considered Harmful",
      author:"Edsger W. Dijkstra",
      url:"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ]

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})