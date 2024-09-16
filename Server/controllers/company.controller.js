import { Company } from "../models/company.model.js";


// Register New Company
export const registerCompany = async (req,res) =>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            })
        }
        let company = await Company.findOne({name:companyName})
        if(company){
            return res.status(400).json({
                message:"Company name already registered with us. Try different name.",
                success:false
            })
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        })

        res.status(201).json({
            message:"Company Registered Successfully",
            company,
            success:true
        })
    } catch (error) {
        console.log("Unable to Register Company: ", error);
        
    }
}



// Get all create companies by a particular user
export const getCompany = async (req,res) =>{
    try {
        const userId = req.id    //logged in userId
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }

        return res.status(201).json({
            message:`All companies created by ${userId}`,
            companies,
            success:true
        })
    } catch (error) {
        console.log("Unable to get company details: ", error);
        
    }
}


// Get company by id
export const getCompanyById = async (req,res) =>{
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(201).json({
            company,
            success:true
        })

    } catch (error) {
        console.log("Unable to find Company By ID: ", error);
    }
}


// update company details
export const updateCompany = async (req,res) =>{
    try {
        const {name, description, webiste, location} = req.body
        const file = req.file
        
        const updatedData ={name,description, webiste,location}
        const company = await Company.findByIdAndUpdate(req.params.id, updatedData, {new:true});

        if(!company){
            res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Company Details Updated",
            company,
            success:true
        })

    } catch (error) {
        console.log("Unable to update company details: ",error);
        
    }
}