import express from 'express'
import commentCtrl from '../controllers/commentCtrl'
import auth from '../middleware/auth'


const router = express.Router()

router.post('/comment', auth, commentCtrl.createComment)

router.post('/reply_comment', auth, commentCtrl.replyComment)

router.get('/comment/blog/:id', commentCtrl.getComment)

router.patch('/comment/:id', auth, commentCtrl.updateComment)

router.delete('/comment/:id', auth, commentCtrl.deleteComment)

export default router;
