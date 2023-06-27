const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers).post(createUser);


// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// bonus: remove a user's associated thoughts when deleted

module.exports = router;
