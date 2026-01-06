import NurseSpecialization from "../models/NurseSpecialization.js"
import { mrnumberGenerate } from "../utils/MrGenerator.js"



export const createNurseSpecialization = async (req, res) => {

    const {  specializationName, description } = req.body

    try {

        if (!specializationName || !description) {
            return res.status(400).json({ message: "All field are required" })
        }

        const generate = mrnumberGenerate("NS")

        const specialization = await NurseSpecialization.create({
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


export const GetAllNurseSpecialization = async (req,res) => {
    try {
        const NurseSpecializations = await NurseSpecialization.find();
        return res.status(201).json({message : "All Doctor Specialization fetched successfully" , total : NurseSpecializations.length , NurseSpecializations})
        
    } catch (error) {
        return res.status(500).json({message:"error" , error})   
    }
}


export const  updateNurseSpecialization = async (req , res) => {

    const {id} = req.params;

    try {
         const update  = await  NurseSpecialization.findByIdAndUpdate(id , req.body , {new : true , runValidators : true})
 if (!update) {
      return res.status(404).json({ message: "Specilaization not found" });
    }

    res.status(200).json({
      message: "Specilization  updated successfully",
      branch: updatedBranch,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
   
}