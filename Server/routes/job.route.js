import express from 'express'
import { getAdminJob, getAllJob, getJobById, postJob } from '../controllers/job.controller.js'
import Auth from '../middlewares/Auth.js'

const router = express.Router()

router.route('/createjob').post(Auth ,postJob)
router.route('/get').get(Auth ,getAllJob)
router.route('/get/:id').get(Auth ,getJobById)
router.route('/getadminjobs').get(Auth ,getAdminJob)


export default router;