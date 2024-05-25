const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    name : {
        type: String,
        required : true,
    },
    email : {
        type: String,
        required : true,
        unique : [true, "Email already exist !!"],
        // ager yeh validate nhi likhege toh invalid email bhi add hoskti hai and error nhi ayega.
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    phone : {
        type: Number,
        required : true,
        min: 10,
    },
    password : {
        type: String,
        required: true, 
        minlength: 6
    }
})

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;