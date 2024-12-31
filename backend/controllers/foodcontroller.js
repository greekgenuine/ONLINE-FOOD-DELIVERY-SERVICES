import foodmodel from '../models/food-model.js';
import fs from 'fs';

// Add food item
const addfood = async (req, res) => {
    let image_filename = req.file.filename;
    const food = new foodmodel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: 'Food added successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Process failed!!' });
    }
};

// List all food items
const listfood = async (req, res) => {
    try {
        const foods = await foodmodel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Process failed!!' });
    }
};

// Remove food item
const removefood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food item not found!' });
        }

        // Delete image from folder
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.log(err);
            }
        });

        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Food removed successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Process failed!!' });
    }
};

export { addfood, listfood, removefood };
