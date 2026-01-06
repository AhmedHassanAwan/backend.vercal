

export const rolemiddleware = (...allowedRoles) => {
    return (req , res , next) => {
        if (!req.user) {
            return res.status(401).json({message : "Not authenticated"})
            
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(400).json({message :"you are not allowed"})
            
        }
        next()
    }
}