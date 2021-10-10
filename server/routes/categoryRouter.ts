import express from 'express'
import auth from '../middleware/auth'
import categoryCtrl from '../controllers/categoryCtrl'

const router = express.Router()

router.route('/category')
    .get(categoryCtrl.getCategory)
    .post(auth, categoryCtrl.createCategory)

router.route('/category/:id')
    .patch(auth, categoryCtrl.updateCategory)
    .delete(auth, categoryCtrl.deleteCategory)
export default router;