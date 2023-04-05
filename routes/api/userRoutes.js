const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');

router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getSingleUser);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);
router.post('/users/:userId/friends', userController.addFriend);
router.delete('/users/:userId/friends/:friendId', userController.deleteFriend);

module.exports = router;

