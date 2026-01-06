import User from "../models/User.js";
import Nurse from "../models/Nurse.js";
import Branch from "../models/Branch.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";
import { mrnumberGenerate } from "../utils/MrGenerator.js";

const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const NurseCreate = async (req, res) => {
  const {
    name,
    email,
    phone,
    cnic,
    gender,
    experience,
    specialization,
    availability
  } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const nurseAvail = availability[0];
    const branch = await Branch.findOne({ branchname: nurseAvail.branch });

    if (!branch) {
      return res.status(404).json({ message: `Branch '${nurseAvail.branch}' not found` });
    }

    const isValidSchedule = branch.branchshedule.some((schedule) => {
      const daysValid = nurseAvail.days.every((day) =>
        schedule.days.includes(day)
      );

      const nurseStart = timeToMinutes(nurseAvail.startTime);
      const nurseEnd = timeToMinutes(nurseAvail.endTime);
      const branchStart = timeToMinutes(schedule.startTime);
      const branchEnd = timeToMinutes(schedule.endTime);

      const timeValid = nurseStart >= branchStart && nurseEnd <= branchEnd;

      return daysValid && timeValid;
    });

    if (!isValidSchedule) {
      return res.status(400).json({
        message: "Invalid Schedule: Nurse's days or time do not match with the branch opening hours.",
      });
    }

    const password = "12345678";
    const hashedPassword = await bcrypt.hash(password, 10);
    const generateMR = mrnumberGenerate("NR");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "nurse"
    });

    const nurse = await Nurse.create({
      user: user._id,
      mrnumber: generateMR,
      phone,
      cnic,
      gender,
      experience,
      specialization,
      availability
    });

    try {
      await sendEmail({
        to: email,
        subject: "Your Nurse Account Created",
        html: `
            <h3>Welcome Nurse ${name}</h3>
            <p>Your account has been created.</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Temporary Password:</b> ${password}</p>
            <p>Please login and change your password.</p>
          `,
      });
    } catch (mailError) {
      console.log("Email sending failed:", mailError.message);
    }

    return res.status(200).json({
      message: "Nurse created successfully & email sent",
      nurse
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

