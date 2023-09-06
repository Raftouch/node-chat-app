const express = require('express')
const path = require('path') 
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

const start = () => {
  try {
    app.listen(port, () => console.log(`App listening on port ${port}`))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
