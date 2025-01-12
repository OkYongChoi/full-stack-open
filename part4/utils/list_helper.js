const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((acc, blog) =>
    acc.likes > blog.likes ? acc : blog,
  )

  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
