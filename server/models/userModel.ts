import mongoose from 'mongoose'
import { IUser } from '../config/interface'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hãy nhập tên"],
        trim: true,
        maxLength: [20, "Tên tối đa 20 kí tự"]
    },
    account: {
        type: String,
        required: [true, "Hãy nhập email hoặc số điện thoại"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Hãy nhập mật khẩu"],
        min: [6, "Mật khẩu tối thiểu 6 kí tự"],
        trim: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/hunre/image/upload/v1622210328/samples/t%E1%BA%A3i_xu%E1%BB%91ng_2_sf3hpq.jpg'
    },
    role: {
        type: String,
        default: 'user' //admin
    },
    type: {
        type: String,
        default: 'register' //login
    },
    rf_token: {
        type: String,
        select : false
    }

}, {
    timestamps: true
})

export default mongoose.model<IUser>('user', userSchema);
