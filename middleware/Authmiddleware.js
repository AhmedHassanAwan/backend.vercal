

import jwt from 'jsonwebtoken';

export const protect = (req , res , next) => {
    const authHeader = req.headers.authorization;
    // console.log( "auth",authHeader);
    

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message : "No token provided"});
    }

      const token = authHeader.split(" ")[1];
      
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN);
        req.user = decoded;
        // console.log("decoded",decoded);
        
        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
        
    }
}
