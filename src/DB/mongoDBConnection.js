import mongoose from "mongoose";

async function connectToMongo(){
 try{
    console.log(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
    const instance=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
    console.log("MongoDB successfully conencted at: ",instance.connection.host)
 }
 catch(e){
    console.log("Error connecting to the database",e.message)
 }
}

export default connectToMongo