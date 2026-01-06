

import mongoose from "mongoose";

const LabSchema = new mongoose.Schema(
    {
        mrnumber: { type: String , unique : true },

        specializationName: {
            type: String,
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

const LabSpecialization = mongoose.model(
    "DoctorSpecialization",
    LabSchema
);

export default LabSpecialization;
