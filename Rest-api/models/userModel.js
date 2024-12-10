const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nickName: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Nickname should be at least 5 characters'],
    },
    height: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password should be at least 5 characters'],
    },
    // themes: [{
    //     type: ObjectId,
    //     ref: "Theme"
    // }],
    // posts: [{
    //     type: ObjectId,
    //     ref: "Post"
    // }]
}, 
// { timestamps: { createdAt: 'created_at' } }
);

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                }
                this.password = hash;
                next();
            })
        })
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
