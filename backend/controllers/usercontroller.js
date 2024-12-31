import usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Creating token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Login user
const loginuser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usermodel.findOne({ email });
        if (!user) return res.json({ success: false, msg: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, msg: "Password is incorrect" });

        const token = createToken(user._id);
        res.json({ success: true, msg: "User logged in", token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Invalid credentials" });
    }
}

// Register user
const registeruser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await usermodel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new usermodel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Invalid credentials" });
    }
}

export { loginuser, registeruser };
