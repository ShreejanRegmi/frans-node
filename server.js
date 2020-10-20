const express = require('express')
const path = require('path')
const app = express()
const ejsLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('layout', 'layouts/user-layout')

app.use(ejsLayout)
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home', {title: 'Home'})
})

app.get('/getcss', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/styles.css'))
})
app.listen(PORT, console.log(`listening on port ${PORT}`))