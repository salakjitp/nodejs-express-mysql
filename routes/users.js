const express = require('express'), router = express.Router();

const controller = require('../controllers/users-controller');

//GET
router.get('/list', controller.getUsers);

//POST : create new
router.post('/add', controller.postUser);

//PUT : update user by id
router.put('/update/:id', controller.putUser);

//DELETE : delete user by id
router.delete('/delete/:id', controller.delUser);


module.exports = router;