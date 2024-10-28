import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        required: false,
        default: {}
    },
    image: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        minimize: false
    });

const verify = mongoose.models.user || mongoose.model("user", userSchema);

export const userModel = verify;