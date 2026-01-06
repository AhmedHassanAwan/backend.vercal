
import mongoose from "mongoose";

const NurseSpecializationSchema = new mongoose.Schema(
    {
       mrnumber: { type: String , unique : true },

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

const NurseSpecialization = mongoose.model(
    "NurseSpecialization",
    NurseSpecializationSchema
);

export default NurseSpecialization;
