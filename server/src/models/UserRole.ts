

import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new Schema({
  id: { type: String, default: uuidv4 }, // Custom user ID using uuid
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['Admin', 'Superadmin', 'Caller', 'Account'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive'], 
    required: true 
  },
  profileImage: { type: String }, // Store profile image URL or path
});

export default model('Uuser', UserSchema);
