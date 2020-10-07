require('dotenv').config()
const axios = require('axios')
const express = require('express')
const layouts = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT
const methodOverride = require('method-override')
let db = require('./models')

app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/beans', require('./controllers/beans'))

// app.get('/', (req, res) => {
//     res.send('Welcome home')
// })

app.get('/', (req, res) => {
    db.Bean.find((err, beans) => {
        if(err) res.send('Error fetching beans!')
        else {
            axios.get('https://api.kanye.rest')
            .then(response => {
                res.render('index', {beans: beans, response: response.data})
            })
        }
    })
})

app.listen(PORT || 4000, () => {console.log(`Churnin n Burning on port ${PORT}`)})