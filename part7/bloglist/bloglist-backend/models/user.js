const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: async function(username) {
                const user = await User.findOne({ username });
                if(user) {
                    if(this.id === user.id) {
                    return true;
                }
            return false;
        }
        return true;
      },
      message: props => 'username must be unique'
    },
        unique: true,
        required: true,
        minlength: 3
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
        minlength: 3
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User