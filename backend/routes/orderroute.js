import express from "express";
import authmiddleware from "../middleware/auth.js";
import { placeorder, verifyorder,userorder,listorder, update_status} from "../controllers/ordercontroller.js";

const orderrouter = express.Router();
orderrouter.post("/place", authmiddleware, placeorder);
orderrouter.post("/verify",verifyorder)
orderrouter.post("/userorders", authmiddleware, userorder);
orderrouter.get("/list",listorder)
orderrouter.post("/status",update_status)
export default orderrouter;
