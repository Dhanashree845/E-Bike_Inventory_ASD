const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

const isAdmin = (req, res, next) => {
    if(req.user.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Admin access required",
        });
    }
    next();
};

module.exports = { isAuth, isAdmin };