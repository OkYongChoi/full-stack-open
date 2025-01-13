const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((acc, blog) =>
    acc.likes > blog.likes ? acc : blog,
  )

  return favorite
}

const mostBlogs = (blogs) => {
  if (_.isEmpty(blogs)) {
    return null
  }
  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(
    Object.keys(authorCounts),
    (author) => authorCounts[author],
  )

  return { author: topAuthor, blogs: authorCounts[topAuthor] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
