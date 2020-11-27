import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, default: false, required: true},
    isAdmin: {type: Boolean, default: false, required: true}
},
    { timestamp: true }
); 
const User = mongoose.model("User", userSchema);
export default User;