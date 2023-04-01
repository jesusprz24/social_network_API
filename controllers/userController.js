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
        .selec
    }

}