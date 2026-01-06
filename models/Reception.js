


import mongoose from "mongoose";
const ReceptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
        unique: true
    },
      mrnumber: { type: String , unique : true },
    phone: { type: String, require: true },
    cnic: { type: String, require: true },
    gender: { type: String, enum: ["male", "female"], require: true },
    experience: { type: Number, require: true },
    availability: [
        {
            branch: { type: String, require: true },
            days: { type: [String], require: true },
            startTime: { type: String, require: true },
            endTime: { type: String, require: true },
        }
    ]
}, { timestamps: true });


const Reception = mongoose.model("Reception", ReceptionSchema);
export default Reception