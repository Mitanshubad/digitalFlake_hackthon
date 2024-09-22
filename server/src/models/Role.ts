import mongoose, { Document } from 'mongoose';

// Define interface for Role Document
export interface RoleDocument extends Document {
  roleName: string;
  status: 'Active' | 'Inactive';
}

// Define the schema for Role
const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
});

// Export the Role model
export const Role = mongoose.model<RoleDocument>('Role', roleSchema);
