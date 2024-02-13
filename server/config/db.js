import mongoose from 'mongoose'


const connectWithDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        if (conn) {
            console.log(`Connected to DB : ${conn.connection.host}`);
        }
    } catch (error) {
        console.log(error);
    }
}

export default connectWithDB