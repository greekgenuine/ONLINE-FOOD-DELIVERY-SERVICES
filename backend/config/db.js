import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://siddhesh:root@cluster0.byauyat.mongodb.net/food-del', {
    
        });
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};
