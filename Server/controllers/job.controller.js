import { Job } from "../models/job.model.js";

// Create New Job
export const postJob = async (req,res)=>{
    try {
        const {title, description, requirements, salary, location, jobType, position, experience, companyId } = req.body
        const userId = req.id

        console.log(req.body);
        

        if(!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","), 
            salary:Number(salary),
            location,
            jobType,
            position,
            experience,
            company:companyId,
            createdBy:userId
        })

        return res.status(201).json({
            message:"New Job Created Successfully",
            success:true,
            job
        })
    } catch (error) {
        console.log("Unable to create job: ",error);
        
    }
}


// get all job
export const getAllJob = async (req,res) =>{
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        }
        const jobs = await Job.find(query).populate({
            path:'company'
        }).sort({createdAt:-1})
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log("Unbale to all the jobs: ",error);
        
    }
}


// get Job by ID
export const getJobById = async (req,res) =>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        return res.status(201).json({
            message:job,
            success:true
        })
    } catch (error) {
        console.log("Unable to find job by id: ",error);
        
    }
}


// get admin job 
export const getAdminJob = async (req,res)=>{
    try {
        const adminId = req.id
        const jobs = await Job.find({createdBy:adminId})
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }

        return res.status(201).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log("Unable to get admin id: ", error);
        
    }
}
