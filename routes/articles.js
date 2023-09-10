const express = require('express')
const router = express.Router()
const Article = require('./../models/article')


router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('/articles/show', { article: article })
})

router.post('/', async (req, res) => {
    let article = new Article({
        heading: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (ex) {
        console.log(ex)
        res.render('articles/new', { article: article })
    }

})

router.put('/edit/:id', async (req, res) => {
    let article = Article.findById(req.params.id)
    article.heading = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (ex) {
        console.log(ex)
        res.render('articles/new', { article: article })
    }

})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router