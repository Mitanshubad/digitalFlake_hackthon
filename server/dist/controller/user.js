"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.getAllUsers = void 0;
const UserRole_1 = __importDefault(require("../models/UserRole"));
// Fetch all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserRole_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
exports.getAllUsers = getAllUsers;
// Add a user
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mobile, email, role, status } = req.body;
    console.log(name, mobile, email, role, status);
    try {
        const newUser = new UserRole_1.default({ name, mobile, email, role, status });
        yield newUser.save();
        res.json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});
exports.addUser = addUser;
// Update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mobile, email, role, status } = req.body;
    try {
        // Update user by the custom "id" field, not MongoDB's _id
        const updatedUser = yield UserRole_1.default.findOneAndUpdate({ id: req.params.id }, { name, mobile, email, role, status }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});
exports.updateUser = updateUser;
// Delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete user by custom "id" field, not MongoDB's _id
        const deletedUser = yield UserRole_1.default.findOneAndDelete({ id: req.params.id });
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});
exports.deleteUser = deleteUser;
// Fetch single user
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find user by the custom "id" field
        const user = yield UserRole_1.default.findOne({ id });
        // Check if the user exists
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Return user if found
        res.status(200).json(user);
    }
    catch (error) {
        // Log the error for debugging
        console.error('Error fetching user:', error);
        // Send a 500 error response with a more informative message
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});
exports.getSingleUser = getSingleUser;
