import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: 
        { 
            type: String, 
            required: true 
        },
        email: 
        { 
            type: String, 
            required: true, 
            unique: true
        },
        password: 
        { 
            type: String, 
            required: true 
        },
        mobileNo: 
        {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, 'Invalid mobile number']
        },
        address: 
        { 
            type: String, 
            required: true 
        }
  }, { timestamps: true });
  

const User = mongoose.model('User', userSchema);

export default User;
