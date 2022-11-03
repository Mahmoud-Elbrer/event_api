const express = require('express');
const router = express.Router();

//Controllers
const Emirate = require('../controller/emirate');

//Routes
router.post('/', Emirate.addEmirate);
router.get('/', Emirate.getEmirate);  
router.delete('/:id', Emirate.deleteEmirate); 


module.exports = router;