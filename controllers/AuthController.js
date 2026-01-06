import User from '../models/User.js';
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";




export const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const accesstoken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);


        user.refreshToken = refreshToken;

        await user.save();


        // save refresh token in cookie

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
        })


        return res.status(200).json({
            message: "Login successful",
            accessToken: accesstoken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isFirstLogin: user.isFirstLogin
            }
        })



    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });

    }
}


export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({ message: "No refresh token provided" });
    }
    try {
        const user = await User.findOne({ refreshToken });

        if (!user) {
            return res.status(400).json({ message: "Invalid refresh token" });
        }

        user.refreshToken = null;

        await user.save();
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {

        return res.status(500).json({ message: "Server error", error: error.message });

    }

}



export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select("+password");

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Your current password is invalid"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.isFirstLogin = false;

        await user.save();

        res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
