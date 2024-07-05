const express = require('express')
const router = express.Router()
const model = require('../controller/book')

router.post('/create' , model.add)
router.get('/all' , model.getAll)
router.get('/:id' , model.getId)
router.put('/:id' , model.modelPut)
router.delete('/:id' , model.modelDelete)

module.exports = router