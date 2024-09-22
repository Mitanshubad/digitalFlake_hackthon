"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const UserSchema = new mongoose_1.Schema({
    id: { type: String, default: uuid_1.v4 }, // Custom user ID using uuid
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
exports.default = (0, mongoose_1.model)('Uuser', UserSchema);
