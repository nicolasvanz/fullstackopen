const _ = require("lodash")

const totalLikes = (blogs) => {
  const likes = blogs.reduce((acc, curr) => curr.likes + acc, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  return blogs.length !== 0
    ? blogs.reduce(
      (acc, curr) => curr.likes < acc.likes ? acc : curr
    )
    : {}
}

const mostBlogs = (blogs) => {
  return blogs.length !== 0
    ? _.maxBy(_(blogs)
      .groupBy("author")
      .map((objs, key) => ({
        "author": key,
        "blogs": objs.length
      }))
      .value(), author => author.blogs
    )
    : {}
}

const mostLikes = (blogs) => {
  return blogs.length !== 0
    ? _.maxBy(_(blogs)
      .groupBy("author")
      .map((objs, key) => ({
        "author": key,
        "likes": _.sumBy(objs, "likes")
      }))
      .value(), author => author.likes
    )
    : {}
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}