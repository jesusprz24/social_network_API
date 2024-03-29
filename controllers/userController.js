// require the model
const { User, Thought } = require('../models');

const userController = {
// gets all users
    getUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '__v'
        })
        .populate({
            path: 'friends',
            select: '__v'
        })
        .select('__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
// gets one user
    getOneUser({ params}, res) {
        User.findOne({ _id: params.id })
        .populate({
            path:'thoughts',
            select: '__v'
        })
        .select('__v')
        .then(dbUserData => {
            if (dbUserData) {
                res.status(404).json({ message: 'There is no user with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

// create a user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

// update a user
    updateUser({ params, body }, res) {
        User.fineOneAndUpdate({_id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (dbUserData) {
                res.status(404).json({ message: 'There is no user with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

// delete a user
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'There is no user with this id'});
          return;
        }
        res.json(dbUserData);
      })
    .catch(err => res.status(400).json(err));
  },

// add friends
  addFriend({ params }, res) {
    User.fineOneAndUpdate(
        {_id: params.userId },
        {$push: {friends: params.friendId}},
        {new: true}
    )
    ,then(dbUserData => {
        if(dbUserData) {
            res.status(404).json({message: 'There is no user with that id'});
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.json(err));
  },

// delete friends
  deleteFriend({ params }, res) {
    User.findOneAndDelete(
        {_id: params.friendId},
        { $pull: { friends: params.friendId}},
        { new: true}
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  }

};

module.exports = userController;