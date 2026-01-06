import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    mrnumber : {type : String , unique : true},
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    dateOfBirth: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;
