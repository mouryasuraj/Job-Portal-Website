import express from 'express'
import Auth from '../middlewares/Auth.js'
import { applyJobs, getAppliedJobs, updateStatus } from '../controllers/application.controller'

const router = express.Router()

router.route("/applyjob/:id").get(Auth, applyJobs)
router.route("/get").get(Auth, getAppliedJobs)
router.route("/:id/applicants").get(Auth, getAppliedJobs)
router.route("/status/:id/update").get(Auth, updateStatus)


export default router