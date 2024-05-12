const mongoose = require('mongoose');

const connectionString ='mongodb+srv://skcomp1999:Oo8JaGjt60vvtAaf@cluster0.fbm9wjo.mongodb.net/test'
const dbConnection = ()  => {
  mongoose.connect(connectionString).then(()=> console.log('Database connected!')).catch(e => console.log(e, ' : Database connection failed!'))
}

module.exports = dbConnection;
