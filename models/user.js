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
