const express = require('express')
const cors = require('cors')
const ratelimit = require('express-rate-limit')
require('dotenv').config()
const errorHandler = require('./middleware/error')

const PORT =  process.env.PORT || 5000  // Look for env variable PORT else go for 5000

const app = express()

// Rate Limiting
const limiter = ratelimit({
    windowsMs: 10 * 60 * 1000, //10 minutes
    max: 100,
})
app.use(limiter)
app.set('trust proxy', 1)

// Enable Cors
app.use(cors())

// Set static Folder
app.use(express.static('public'))

//Routes
app.use('/api', require('./routes'))

// Error handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
