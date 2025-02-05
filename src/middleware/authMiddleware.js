const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.authToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
        return res.status(401).render("login", { errorMsg: "Unauthorized Access! Please log in." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).render("login", { errorMsg: "Invalid or Expired Token! Please log in again." });
    }
};

module.exports = authMiddleware;
