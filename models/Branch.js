import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
    {
        branchcode: { type: String, required: true },
        branchname: { type: String, required: true },
        branchaddress: { type: String, required: true },

        branchshedule: [
            {
                days: { type: [String], required: true },
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
            },
        ],

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

const Branch = mongoose.model("Branch", BranchSchema);
export default Branch;


