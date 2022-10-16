import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI!;

const connectMongo = async () => await mongoose.connect(uri);

export default connectMongo;
