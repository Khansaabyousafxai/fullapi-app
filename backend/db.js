const mongoose = require(`mongoose`);
const mongoURI = "mongodb://localhost:27017/inotebook"
async function connectTomongo() {
    try {
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected successfully!');
      
    } catch  {
      console.log('Error connecting to MongoDB');
      
    }
  }
module.exports = connectTomongo;