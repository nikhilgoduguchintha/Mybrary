const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

// All Authers Route
router.get('/', async(req,res)=>{
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{
            authors:authors,
            searchOptions:req.query
        })

    }catch{ 
        res.redirect('/')
    }
})

// New Auther Route
router.get('/new',(req,res)=>{
    res.render('authors/new',{author: new Author() })
})

// Create Auther Route
router.post('/',async(req,res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newauthor = await author.save()
        // res.redirect(`authors/${newauthor.id}`)
        res.redirect(`authors`)
    }catch{
        res.render('authors/new',{
            author: author,
            errorMessage: 'Error creating Author'
        })
    }

})
module.exports = router; 