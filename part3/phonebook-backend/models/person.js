require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  // name: String,
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const phoneRegex = /^(\d{2,3})-(\d{4,})$/
        return phoneRegex.test(value)
      },
      message:
        'Phone number must be in the format: XX-XXXXXXXX or XXX-XXXXXXXX where X is a digit.',
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)
module.exports = Person
