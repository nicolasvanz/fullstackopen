const dummy = (blogs) => {
  return 1
}

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}