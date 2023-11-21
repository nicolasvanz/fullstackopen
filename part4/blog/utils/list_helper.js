const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((acc, curr) => curr.likes + acc, 0)
  return likes
}

module.exports = {
  dummy,
  totalLikes
}