// requiring it to use models
const { User, Thought } = require('../models');

// controller function retrieves data thoughts and sends them back to client
const thoughtControllers = {
    getThoughts(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

// gets a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.courseId })
        .then((course) => 
        !thought 
        ? res.status(404).json({ message: 'There is not thought with that ID' })
        : res.json(course)
        )
        .catch((err) => req.status(500).json(err));
    },

// creates a thought
    creatThought(req, res) {
        Thought.create(req.body)
        .then(async (thought) => {
            const user = await User.findOneAndUpdate({ username:req.body.username},
                {$push: {thoughts: {_id: thought._id}}});
            res.json(thought)
        })
        .catch((err) => res.status(500).json(err));
    },

// delete thought 
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'There is no thought with that ID' })
            : User.findOneAndUpdate({ userId: req.body.userId}, {$pull: {
                thoughts: req.params.thoughtId}}, { new: true })
        )
        .then(() => res.json({ message: 'Thought has been deleted' }))
        .catch((err) => res.status(500).json(err));
    },

// Update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.courseId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'There is no thought with this id' })
            : res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },

// create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
            ? res.status(404).son({ message: 'There is not thought with this id' })
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

// deletes reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'There is no reaction with this id'})
        )
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtControllers;