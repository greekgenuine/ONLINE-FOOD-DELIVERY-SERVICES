import usermodel from '../../backend/models/usermodel.js';

// Add items to user's cart
const addtocart = async (req, res) => {
    try {
        let userdata = await usermodel.findById(req.body.userid);
        let cartdata = userdata.cartdata;

        if (!cartdata[req.body.itemid]) {
            cartdata[req.body.itemid] = 1;
        } else {
            cartdata[req.body.itemid] += 1;
        }

        await usermodel.findByIdAndUpdate(req.body.userid, { cartdata });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding to cart" });
    }
};

// Remove items from user's cart
const removefromcart = async (req, res) => {
    try {
        let userdata = await usermodel.findById(req.body.userid);
        let cartdata = userdata.cartdata;

        if (cartdata[req.body.itemid] > 0) {
            cartdata[req.body.itemid] -= 1;
        }

        await usermodel.findByIdAndUpdate(req.body.userid, { cartdata });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing from cart" });
    }
};

// Fetch user's cart data
const getcart = async (req, res) => {
    try {
        let userdata = await usermodel.findById(req.body.userid);
        let cartdata = userdata.cartdata;
        res.json({ success: true, cartdata });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching cart data" });
    }
};

export { addtocart, removefromcart, getcart };
