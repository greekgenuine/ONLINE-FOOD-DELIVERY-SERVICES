import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now },
    payment: { type: String, default: "true" }
});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
