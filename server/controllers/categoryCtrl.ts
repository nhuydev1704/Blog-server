
import { Request, Response } from 'express'
import Categories from '../models/categoryModel'
import { IReqAuth } from '../config/interface'
import Blogs from '../models/blogModel'


const categoryCtrl = {
    createCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Chưa xác thực" })

        if (req.user.role !== 'admin') res.status(400).json({ msg: "Bạn không phải admin" })

        try {
            const name = (req.body.name).toLowerCase()

            const newCategory = new Categories({ name })
            await newCategory.save()

            res.json({ newCategory, msg: "Thêm thành công." })
        } catch (err: any) {
            let errMsg;

            if (err.code === 11000) {
                errMsg = Object.values(err.keyValue)[0] + " đã tồn tại."
            } else {
                let name = Object.keys(err.errors)[0]
                errMsg = err.errors[`${name}`].message
            }
            return res.status(500).json({ msg: errMsg })
        }
    },

    getCategory: async (req: IReqAuth, res: Response) => {
        try {
            const categories = await Categories.find().sort("-createAt")
            res.json({ categories })
        } catch (err: any) {

            return res.status(500).json({ msg: err.message })
        }
    },

    updateCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Chưa xác thực" })

        if (req.user.role !== 'admin') res.status(400).json({ msg: "Bạn không phải admin" })
        try {
            await Categories.findOneAndUpdate({
                _id: req.params.id
            }, { name: (req.body.name).toLowerCase() })

            res.json({ msg: "Cập nhật thành công." })
        } catch (err: any) {

            return res.status(500).json({ msg: err.message })
        }
    },

    deleteCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Chưa xác thực" })

        if (req.user.role !== 'admin') res.status(400).json({ msg: "Bạn không phải admin" })
        try {
            const blog = await Blogs.findOne({ category: req.params.id })

            if (blog) return res.status(400).json({ msg: "Không thể xóa danh mục khi còn viết." })

            const category = await Categories.findByIdAndRemove(req.params.id)
            if (category) return res.status(400).json({ msg: "Danh mục không tồn tại." })

            res.json({ msg: "Xóa thành công." })
        } catch (err: any) {

            return res.status(500).json({ msg: err.message })
        }
    },
}

export default categoryCtrl;