const express = require('express');
const router = express.Router();

//Controllers
const TypeSelectionProduct = require('../controller/type_selection_product');

//Routes
router.post('/', TypeSelectionProduct.addTypeSelectionProduct);
router.get('/', TypeSelectionProduct.getTypeSelectionProduct);  
router.get('/service/:service', TypeSelectionProduct.getTypeSelectionProductByService);  
router.delete('/:id', TypeSelectionProduct.deleteTypeSelectionProduct); 
router.patch('/', TypeSelectionProduct.updateTypeSelectionProduct); 


module.exports = router;