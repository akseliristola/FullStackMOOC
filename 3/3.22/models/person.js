const mongoose = require('mongoose')



const url = process.env.MONGODB_URI
mongoose.connect(url,{ useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')})
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)})

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minlength:5
  },
  number:{
    type:String,
    minlength:8,
    validate:{
      validator: function(v){
        return !v.includes('--') && (v[2]==='-' || v[3]==='-') && (!isNaN(v.split('-').join('')))
      }
    } }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)
