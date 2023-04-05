const {Schema, model} = require('mongoose');
const Thought = require('./Thought');

// schema used for the student model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/,'Please enter a valid email' ]
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],  
    }, 
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// using a virtual property to define a getter function
userSchema.virtual('friendcount').get(function () {
    return this.friends.length;
})

userSchema.pre('remove', function() {
    Thought.deleteMany({_id: req.params.thoughtId})
    .then(() => User.updateMany({}, {$pull: {thoughts: req.params.userId}}))
    .then(() => res.json({ message: 'User has been deleted'}))
    .catch(err => res.json(err));
});


module.exports = model('User', userSchema);