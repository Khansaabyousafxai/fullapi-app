const connectTomongo = require('./db');
const express = require('express');
connectTomongo();
var cors = require('cors')


const app = express()
const port = 5000

app.use(cors())
app.use(express.json())



app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Inotebook backend app listening on port ${port}`)
})