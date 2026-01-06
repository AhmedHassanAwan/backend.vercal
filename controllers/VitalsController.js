
import Case from "../models/cases.js"
import Visit from "../models/visit.js";

export const addVitals = async(req,res) => {

    try {
        const {caseId} = req.params

        const  casedata = await Case.findById(caseId);
        if (!casedata) {
            return res.status(400).json({message :"Case can not find"})
        }

        if (casedata.status !== "AWAITING VITALS") {
            return res.status(400).json({message:"Awaiting vitals already in case"})   
        } 

        const visit = Visit.create({
            case : caseId , 
            vitals : {
                bp,
                temperature,
                pulse,
                weight,
                nurse : req.user._id
            }
        })

        casedata.status = "AWAITING DOCTOr"
        await Case.save();

        return res.status(201).json({
            sucess : true,
            message : "Vitals added successfully" ,
            visit
        })

    } catch (error) {
        return res.status(500).json({mesage :"server error" , error : error.message})
    }

}