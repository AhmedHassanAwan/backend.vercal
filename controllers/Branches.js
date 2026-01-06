import Branch from "../models/Branch.js";

export const createBranch = async (req, res) => {
    
    try {
        const { branchcode, branchaddress, branchname, branchshedule} = req.body;
        
       
    
    if (!branchcode || !branchname || !branchaddress) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }


    const existingBranch = await Branch.findOne({ branchcode });
    if (existingBranch) {
      return res.status(409).json({
        message: "Branch with this code already exists",
      });
    }

    
    const branch = await Branch.create({
      branchcode,
      branchname,
      branchaddress,
      branchshedule,
      status: "active", 
    });

    
    return res.status(201).json({
      message: "Branch created successfully",
      branch,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const GetAllBranches = async (req , res) => {

  try {
    const branches = await Branch.find();
    return res.status(201).json({message : "All branches fetched successfully" , total: branches.length , branches})
  } catch (error) {

    return res.status(500).json({message :"server error"})
  }
}



export const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBranch = await Branch.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBranch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.status(200).json({
      message: "Branch updated successfully",
      branch: updatedBranch,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
