const express = require('express'), router = express.Router();

const controller = require('../controllers/catbreed-controller');

//GET
router.get('/list', controller.getCatBreed);

//POST : create new
router.post('/new', controller.postCatBreed);


module.exports = router;