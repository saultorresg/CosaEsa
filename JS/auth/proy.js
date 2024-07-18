const express = require('express')
const router = express.Router()
const autheticate = require('./addlwelre')

router.get('/', autheticate, (req, res) => {

    res.send('This is a protected route')
})

module.exports = router