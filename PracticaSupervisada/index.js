import app from './config/app.js'

const PORT = process.env.PORT || 2655

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

