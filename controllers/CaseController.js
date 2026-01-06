
import Case from "../models/cases.js"
import Visit from "../models/visit.js"

export const createcase = async (req, res) => {
  const { patient, doctor, amount, disease, status } = req.body

  try {
    if (!patient) return res.status(400).json({ message: "patient not found" })
    if (!doctor) return res.status(400).json({ message: "doctor not found" })


      const count = await Case.countDocuments();

      const NextNumber = count + 1;

      const caseNo = `CN-${NextNumber.toString().padStart(4, '0')}`;


    const Newcase = await Case.create({
      caseNo,
      patient,
      doctor,
      amount,
      disease,
      status
    })
    return res.status(201).json({ message: "case successfully create", Newcase })
  } catch (error) {
    return res.status(500).json({ message: "server Error", error: error.message })
  }
}




export const getcase = async (req, res) => {
  try {
    const cases = await Case.find()
      .populate("patient", "name mrnumber phone cnic gender dateOfBirth")
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name"
        }
      });



    const formattedCases = cases.map(c => ({
      _id: c._id,
      patient: c.patient,
      doctorName: c.doctor?.user?.name || null,
      amount: c.amount,
      disease: c.disease,
      status: c.status,
      createdAt: c.createdAt
    }));

    return res.status(200).json({
      message: "case successfully get",
      GetCases: formattedCases


    });

  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message
    });
  }
};




//// single case detail

export const getSingleCase = async (req, res) => {
  try {
    
    const caseData = await Case.findById(req.params.id)
      .populate("patient", "name fatherName mrNumber phone gender dateOfBirth")
      .populate({
        path: "doctor",
        populate: { path: "user", select: "name" }
      })
      .populate("branch", "name address");

    if (!caseData) {
      return res.status(404).json({ message: "Case not found" });
    }

    
    const visits = await Visit.find({ case: caseData._id })
      .populate("vitals.nurse", "name")
      .populate({
        path: "treatment.doctor",
        populate: { path: "user", select: "name" }
      })
      .populate("labDetails.lab", "name")
      .populate("pharmacyDetails.pharmacist", "name")
      .sort({ createdAt: -1 });

    const currentVisit = visits[0] || null;


    res.status(200).json({
      success: true,
      patient: caseData.patient,
      case: {
        caseNo: caseData.caseNo,
        disease: caseData.disease,
        amount: caseData.amount,
        status: caseData.status,
        createdAt: caseData.createdAt
      },
      doctor: caseData.doctor?.user?.name || null,
      branch: caseData.branch,
      currentVisit,
      visitHistory: visits
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


