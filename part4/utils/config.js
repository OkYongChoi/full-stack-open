require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
console.log('MONGODB_URI:', MONGODB_URI)

module.exports = {
  MONGODB_URI,
  PORT,
}
