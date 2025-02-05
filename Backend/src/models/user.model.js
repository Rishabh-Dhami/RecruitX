import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose, {Schema} from 'mongoose';


// Define the "role" attribute in the user schema to distinguish between candidates and recruiters.

const userSchema = new Schema({
    fullname : {
        type : String,
        trim : true,
        required : [true, "username is required"]
    },
    email : {
        type : String,
        trim : true,
        required : [true, "email is required"],
        lowercase : true,
        unique : true
    },
    password : {
        type : String,
        required : [true, "password is required"],
        trim : true,
        select : false
    },
    refreshToken :{
        type : String,
        select : false
    }
});

userSchema.pre('save', async function (next) {
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



userSchema.methods.generateRefreshToken = function () {
    const refreshToken = jwt.sign(
        { _id : this._id, fullname: this.fullname },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d"} 
    );
    this.refreshToken = refreshToken; 
    return refreshToken;
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id , fullname : this.fullname}, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "15m" } // Adjust expiration as needed
    );
};

// Compare password for login
userSchema.methods.comparePassword = async function (plainTextPassword) {
    try {
        return await bcrypt.compare(plainTextPassword, this.password);
    } catch (error) {
        throw error;
    }
};




export const  User = mongoose.model("User", userSchema);