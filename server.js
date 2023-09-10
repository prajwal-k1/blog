const express = require('express')
const app = express()
const articlesRouter = require('./routes/articles')   //import articles router
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')

async () => {
    await mongoose.connect('mongodb://localhost/blog')
        .then(console.log("connected"))
        .catch(e => console.log(e))
}

//Setting up view as ejs, this is the frontend
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find()
    res.render('index', { articles: articles })
})

//listens to address '/' in url 
// app.get('/', (req, res) => {
//     res.render('index');
// })

//use the router that's imported, 
//the first variable is what gets appended in url everytime this router is used
app.use('/articles', articlesRouter)

//Listens to whichever port mentioned
app.listen(5000);