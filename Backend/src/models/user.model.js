import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose, {Schema} from 'mongoose';


const UserSchema = new Schema({
    username : {
        type : String,
        trim : true,
        required : [true, "username is required"]
    },
    email : {
        type : String,
        trim : true,
        required : [true, "email is required"],
        lowercase : true
    },
    password : {
        type : String,
        required : [true, "password is required"],
        trim : true
    },
    refreshToken :{
        type : String,
        select : false
    }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            throw new ApiError(400, "Error occur while saving password");
        }
    } else {
        return next();
    }
});

export const  User = mongoose.model("User", UserSchema);