import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";
import { mrnumberGenerate } from "../utils/MrGenerator.js";
import Branch from "../models/Branch.js";

const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const createDoctor = async (req, res) => {
  const {
    name,
    email,
    phone,
    cnic,
    gender,
    experience,
    specialization,
    availability,
  } = req.body;

  try {
    
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }


    const doctorAvail = availability[0];
    const branch = await Branch.findOne({ branchname: doctorAvail.branch });

    if (!branch) {
      return res.status(404).json({ message: `Branch '${doctorAvail.branch}' not found` });
    }

    const isValidSchedule = branch.branchshedule.some((schedule) => {
      const daysValid = doctorAvail.days.every((day) =>
        schedule.days.includes(day)
      );

      const docStart = timeToMinutes(doctorAvail.startTime);
      const docEnd = timeToMinutes(doctorAvail.endTime);
      const branchStart = timeToMinutes(schedule.startTime);
      const branchEnd = timeToMinutes(schedule.endTime);

      const timeValid = docStart >= branchStart && docEnd <= branchEnd;

      return daysValid && timeValid;
    });

    if (!isValidSchedule) {
      return res.status(400).json({
        message: "Invalid Schedule: Doctor's days or time do not match with the branch opening hours.",
      });
    }

    const password = "12345678"; // Default password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
    });

    const doctor = await Doctor.create({
      user: newUser._id,
      mrnumber: mrnumberGenerate("DR"),
      email ,
      phone,
      cnic,
      gender,
      experience,
      specialization,
      availability,
    });

    try {
      await sendEmail({
        to: email,
        subject: "Doctor Account Created",
        html: `<h3>Welcome Dr. ${name}</h3>
               <p>Your account has been created successfully.</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Password:</b> ${password}</p>`,
      });
    } catch (emailErr) {
      console.log("Email sending failed but doctor created:", emailErr.message);
    }

    res.status(201).json({
      message: "Doctor created successfully",
      doctor,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};