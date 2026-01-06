import Patient from "../models/Patients.js"
import  { mrnumberGenerate } from "../utils/MrGenerator.js"

export const createPatient = async (req, res) => {
  const {
    name,
    fatherName,
    cnic,
    phone,
    gender,
    area,
    amount,
    dateOfBirth,
  } = req.body;

  try {
    const existingPatient = await Patient.findOne({ cnic });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const mrNumber = mrnumberGenerate("PT")

    const patient = await Patient.create({
      mrnumber : mrNumber,
      name,
      fatherName,
      cnic,
      phone,
      gender,
      area,
      amount,
      dateOfBirth,
    });

    return res.status(201).json({
      message: "Patient added successfully",
      patient,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
