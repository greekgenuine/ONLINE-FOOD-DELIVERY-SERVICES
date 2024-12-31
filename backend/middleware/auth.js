import jwt from "jsonwebtoken";

const authmiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Please log in again." });
    }
    try {
        const tokendecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userid = tokendecode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Authentication error" });
    }
};

export default authmiddleware;
