import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
   mrnumber: { type: String , unique : true },
   email : {type : String , unique : true} , 
  phone: { type: String, required: true },
  cnic: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  experience: { type: Number, required: true },
  specialization: { type: [String], required: true },
  availability: [
    {
      branch: { type: String, required: true },
      days: { type: [String], required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    }
  ]
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
