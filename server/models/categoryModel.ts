import mongoose from 'mongoose'


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hãy nhập danh mục."],
        trim: true,
        unique: true,
        maxLength: [50, "Tên danh mục không quá 50 kí tự."]
    }
}, {
    timestamps: true
})

export default mongoose.model('category', categorySchema)

