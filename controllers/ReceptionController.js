import User from "../models/User.js";
import Reception from "../models/Reception.js";
import Branch from "../models/Branch.js"; // Branch model zaroori hay
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";
import { mrnumberGenerate } from "../utils/MrGenerator.js";

const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const createReception = async (req, res) => {
  const {
    name,
    email,
    phone,
    cnic,
    gender,
    experience,
    availability, 
  } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const staffAvail = availability[0];
    const branch = await Branch.findOne({ branchname: staffAvail.branch });

    if (!branch) {
      return res.status(404).json({ message: `Branch '${staffAvail.branch}' not found` });
    }

    const isValidSchedule = branch.branchshedule.some((schedule) => {
      const daysValid = staffAvail.days.every((day) =>
        schedule.days.includes(day)
      );

      const staffStart = timeToMinutes(staffAvail.startTime);
      const staffEnd = timeToMinutes(staffAvail.endTime);
      const branchStart = timeToMinutes(schedule.startTime);
      const branchEnd = timeToMinutes(schedule.endTime);

      const timeValid = staffStart >= branchStart && staffEnd <= branchEnd;

      return daysValid && timeValid;
    });

    if (!isValidSchedule) {
      return res.status(400).json({
        message: "Invalid Schedule: Receptionist's days or time do not match with the branch opening hours.",
      });
    }
    const password = "12345678";
    const hashedPassword = await bcrypt.hash(password, 10);
    const generateMR = mrnumberGenerate("RC");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Receptionist",
    });
    const reception = await Reception.create({
      user: user._id,
      mrnumber: generateMR,
      phone,
      cnic,
      gender,
      experience,
      availability,
    });

    try {
      await sendEmail({
        to: email,
        subject: "Your Reception Account Created",
        html: `
          <h3>Welcome ${name}</h3>
          <p>Your account has been created successfully.</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Temporary Password:</b> ${password}</p>
        `,
      });
    } catch (err) {
      console.log("Email error:", err.message);
    }

    return res.status(201).json({
      message: "Reception created successfully & email sent",
      reception,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};