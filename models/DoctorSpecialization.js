import mongoose from "mongoose";

const DoctorSpecializationSchema = new mongoose.Schema(
    {
        mrnumber: { type: String },

        specializationName: {
            type: [String],
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

const DoctorSpecialization = mongoose.model(
    "DoctorSpecialization",
    DoctorSpecializationSchema
);

export default DoctorSpecialization;
