import User from "../models/User.js";
import { generateAccessToken } from "../utils/token.js";
import jwt from "jsonwebtoken";



export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ messsage: "No refresh token provided" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken(user);

        return res.status(200).json({
            accessToken: newAccessToken
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });

    }
}