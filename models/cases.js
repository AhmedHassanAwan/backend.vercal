
import mongoose from "mongoose";

const CaseSchema = new mongoose.Schema({
    caseNo : {type : String , unique : true},
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    branch : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Branch",
        require : true
    },
    amount: {
        type: Number,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    status : {
        type : String,
        enum : ["AWAITING VITALS" , "AWAITING DOCTOR" , "AWAITING LAB " , "AWAITING PHARMACY" , "COMPLETED"] , default:"AWAITING VITALS" 
    }
}, { timestamps: true });


const Case = mongoose.model("cases", CaseSchema);
export default Case