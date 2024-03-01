import mongoose from "mongoose";


const connectToMongoDB=async ()=>{
    try{
        await mongoose.connect('mongodb+srv://abinayaparameswari:12345678abcd@cluster0.rt2tw1w.mongodb.net/Ecommerce?retryWrites=true&w=majority');
        console.log("Connected to MongoDB");
    }catch (error){
        console.log("Error connecting to MongoDB",error.message);
    }

}

export default connectToMongoDB;