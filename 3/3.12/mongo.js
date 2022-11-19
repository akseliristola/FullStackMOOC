const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =`mongodb+srv://puhelinluettelo:${password}@cluster0.ridfphx.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number:String
})

const Person = mongoose.model('Person', noteSchema)



if (process.argv.length==5){
  
  const newperson=new Person(
    {
      name:process.argv[3],
      number:process.argv[4]
    }
  )
  newperson.save().then(result=>{
    console.log("person saved")
    mongoose.connection.close()
  })
}
else{
  Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})}