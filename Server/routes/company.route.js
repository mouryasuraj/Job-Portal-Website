import express from 'express'
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import Auth from '../middlewares/Auth.js';


const router = express.Router()

router.route('/register').post(Auth, registerCompany)
router.route('/get').get(Auth, getCompany)
router.route('/get/:id').get(Auth, getCompanyById)
router.route('/update/:id').put(Auth, updateCompany)

export default router;