const express = require('express');
const router = express.Router();
const { getAllToppings, getToppingById, addTopping, updateTopping, deleteTopping } = require('../controllers/toppingController');

router.get('/', getAllToppings);
router.get('/:id', getToppingById);
router.post('/', addTopping);
router.put('/:id', updateTopping);
router.delete('/:id', deleteTopping);

module.exports = router;