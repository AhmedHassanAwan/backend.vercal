
dotenv.config();
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from '../routes/authroutes.js';
import doctorRoutes from "../routes/doctorRoutes.js"
import nurseRouter from "../routes/nurserouter.js"
import patientRouter from "../routes/patients.js"
import caseRouter from "../routes/caserouter.js"
import receptionRouter from "../routes/receptionroutes.js"
import branchRouter from "../routes/branchesroutes.js"
import doctorspecilization from "../routes/doctorspecilization.js"
import nurserseSpecilization from "../routes/nursespecilization.js"
import connectDB from '../config/db.js';



connectDB()
// mongoose.connect(process.env.MONGODB_URL)
//     .then(() => {
//         console.log('Connected to MongoDB ✅');
//         console.log(process.env.NODE_ENV);

//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error);
//     });

const app = express();
app.use(express.json());

// const PORT = process.env.PORT || 3000;





app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes)
app.use("/api/nurse", nurseRouter)
app.use("/api/reception", receptionRouter)
app.use("/api/patient", patientRouter)
app.use("/api/case", caseRouter)
app.use("/api/branches", branchRouter)
app.use("/api/Specialization", doctorspecilization)
app.use("/api/Specialization", nurserseSpecilization)






app.get('/', (req, res) => {
    res.send('Hello vercel, World! from the updated server! ESM syntax');
});


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT} ✅`);
// })


export default app;
