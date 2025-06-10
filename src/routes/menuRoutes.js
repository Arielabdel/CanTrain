const express = require('express');
const router = express.Router();
const { getAllMenu, getMenuById, addMenu, updateMenu, deleteMenu } = require('../controllers/menuController');

router.get('/', getAllMenu);
router.get('/:id', getMenuById);
router.post('/', addMenu);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);

module.exports = router;