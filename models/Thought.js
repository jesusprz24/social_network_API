const {Schema, model, Types} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.OkectId,
            default: () => new Types.ObjectId,
        },
        rectionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
            transform: (doc, ret) => {
                ret.createdAt = moment(rat.createdAt).format('mm-dd-yyyy, h:mm:ss A');
                return ret;
            },
        },
        id: false,
    }
);
