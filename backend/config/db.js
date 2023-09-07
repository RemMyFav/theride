const mongoose = require("mongoose");
const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO);
        console.log("Successfully Connect to Database".bgGreen);
    } catch (error){
        console.log("Fail to Connect to Database".bgRed);
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB