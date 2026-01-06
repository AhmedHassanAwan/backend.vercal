import DoctorSpecialization from "../models/DoctorSpecialization.js"
import { mrnumberGenerate } from "../utils/MrGenerator.js"



export const createDoctorSpecialization = async (req, res) => {

    const {  specializationName, description } = req.body

    try {

        if (!specializationName || !description) {
            return res.status(400).json({ message: "All field are required" })
        }

        const generate = mrnumberGenerate("DS")

        const specialization = await DoctorSpecialization.create({
            mrnumber : generate,
            specializationName,
            description,
            status: "active"
        })

        return res.status(201).json({ message: "Doctor specialization created successfully", specialization })

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }

}


export const GetAllDoctorSpecialization = async (req,res) => {
    try {
        const Doctorspecializations = await DoctorSpecialization.find();
        return res.status(201).json({message : "All Doctor Specialization fetched successfully" , total : Doctorspecializations.length , Doctorspecializations})
        
    } catch (error) {
        return res.status(500).json({message:"error" , error})   
    }
}



export const  updateDoctorSpecialization = async (req , res) => {

    const {id} = req.params;

    try {
         const update  = await  DoctorSpecialization.findByIdAndUpdate(id , req.body , {new : true , runValidators : true})
 if (!update) {
      return res.status(404).json({ message: "Specilaization not found" });
    }

    res.status(200).json({
      message: "Specilization  updated successfully",
      branch: update,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error"  ,  error});
  }
   
}


