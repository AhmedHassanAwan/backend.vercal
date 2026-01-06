

import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema(
  {
    visitDate: {
      type: Date,
      default: Date.now
    },

    case : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Case",
      require : "true"

    },
 
    vitals: {
      bp: String,
      temperature: String,
      pulse: String,
      weight: String,
      nurse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      vitalsNotes: String
    },

    treatment: {
      diagnosis: String,
      medicines: [String],
      notes: String,
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
      }
    },

    
    labDetails: {
      tests: [String],
      result: String,
      lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
   
    },


    pharmacyDetails: {
      medicinesGiven: [String],
      pharmacist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      feedback: String,
      pharmacyStatus: {
        type: String,
        enum: ["N/A", "PENDING", "COMPLETED"],
        default: "N/A"
      }
    }
  },
  { timestamps: true }
);


const visit = mongoose.model("Visits" , VisitSchema);
export default visit