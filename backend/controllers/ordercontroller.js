import orderModel from "../models/ordermodel.js";
import userModel from "../models/usermodel.js";

const placeorder = async (req, res) => {
    try {
        // Log the received order data
        console.log('Received order data:', req.body);

        // Create a new order document
        const neworder = new orderModel({
            userid: req.body.userid,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            status: "Food Processing", // Set initial status
            date: new Date(), // Record order date
            payment: "true" // Set initial payment status
        });

        // Log the new order object before saving
        console.log('New order object:', neworder);

        // Save the new order to the database
        await neworder.save(); // Use async/await
        console.log('Order saved successfully:', neworder);

        // Update the user's cart data
        await userModel.findByIdAndUpdate(req.body.userid, { cartdata: {} });
        console.log('User cart data updated successfully');

        // Return success response
        res.json({ success: true, message: "Order placed successfully." });
    } catch (error) {
        // Log the error to the console
        console.error("Error placing order:", error);

        // Return error response
        res.status(500).json({ success: false, message: "Failed to place order. Please try again later." });
    }
};
const  verifyorder=async (req,res)=>{
     const {orderid,sucess}=req.body;
     try {
        if (sucess=="true"){
           await orderModel.findByIdAndUpdate(orderid,{status:"success",payment:"true"})
            res.json({sucess:true,message:"paid"})
       }else{
            await orderModel.findByIdAnddelete(orderid,{status:"sucess",payment:"true"})
       res.json({ sucess:false,message:"notpaid"})
       }
     } catch (error) {
        console.log(error);
       res.json({ sucess:false,message:"error"})
    }
}
// userorder for frontend

const  userorder=async (req,res)=>{
try {
    const orders = await orderModel.find({ userid: req.body.userid });
    res.json({success:true,data:orders})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"user_order frontened is failed"})

}
}

// listing orders for admin panel
const  listorder=async (req,res)=>{
try {
    const order=await orderModel.find({});
    res.json({success:true,data:order})
} catch (error) {
    console.log(error);
    res.json({success:false, message:"error"})
}

}
//api for updating order status
const update_status= async (req,res)=>
{
try {
    await orderModel.findByIdAndUpdate(req.body.orderid,{status:req.body.status});
    res.json({success:true,message:"order status updated"})
} catch (error) {
    console.log("error");
    res.json({success:false,message:"error"})
}
}
export { placeorder,verifyorder,userorder,listorder,update_status};
 