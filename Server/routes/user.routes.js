import express from 'express'
import { login, register, updateProfile } from '../controllers/user.controller.js'
import Auth from '../middlewares/Auth.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/profile/update').post(Auth, updateProfile)


export default router;