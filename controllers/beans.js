const router = require('express').Router()
const db = require('../models')

router.get('/:id', (req, res) => {
    db.Bean.findOne({
        _id: req.params.id
    }, (err, bean) => {
        if(err) return console.log(err)
        res.render('show', {bean})
    })
})

router.post('/new', (req, res) => {
    if(req.body.name && req.body.type && req.body.cool){
        db.Bean.create({
            name: req.body.name,
            type: req.body.type,
            coolness: req.body.cool
        })
        .then(bean => {
            if(bean.coolness <= 2){
                res.render('uncool', {bean})
            }
            else{
                res.redirect('/')
            }
        })
    }
    else {
        res.redirect('/')
    }
})

router.delete('/:id', (req, res) => {
    db.Bean.deleteOne({
        _id: req.params.id
    })
    .then(() => {
        res.redirect('/')
    })
})

module.exports = router