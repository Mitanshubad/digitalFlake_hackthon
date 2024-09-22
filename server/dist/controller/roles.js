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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.addRole = exports.getRoleById = exports.getAllRoles = void 0;
const Role_1 = require("../models/Role");
// Get all roles
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role_1.Role.find();
        res.json(roles);
    }
    catch (error) {
        // Casting error as Error type to access the message
        if (error instanceof Error) {
            res.status(500).json({ message: 'Failed to fetch roles', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Failed to fetch roles', error: String(error) });
        }
    }
});
exports.getAllRoles = getAllRoles;
// Get a role by ID
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield Role_1.Role.findById(req.params.id);
        if (role) {
            res.json(role);
        }
        else {
            res.status(404).json({ message: 'Role not found' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching role', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error fetching role', error: String(error) });
        }
    }
});
exports.getRoleById = getRoleById;
// Add a new role
const addRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roleName, status } = req.body;
    if (!roleName || !status) {
        return res.status(400).json({ message: 'Role name and status are required' });
    }
    const newRole = new Role_1.Role({ roleName, status });
    try {
        yield newRole.save();
        res.status(201).json(newRole);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Failed to create role', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Failed to create role', error: String(error) });
        }
    }
});
exports.addRole = addRole;
// Update a role
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roleName, status } = req.body;
    if (!roleName || !status) {
        return res.status(400).json({ message: 'Role name and status are required' });
    }
    try {
        const role = yield Role_1.Role.findByIdAndUpdate(req.params.id, { roleName, status }, { new: true });
        if (role) {
            res.json(role);
        }
        else {
            res.status(404).json({ message: 'Role not found' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating role', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error updating role', error: String(error) });
        }
    }
});
exports.updateRole = updateRole;
// Delete a role
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield Role_1.Role.findByIdAndDelete(req.params.id);
        if (role) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Role not found' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error deleting role', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error deleting role', error: String(error) });
        }
    }
});
exports.deleteRole = deleteRole;
