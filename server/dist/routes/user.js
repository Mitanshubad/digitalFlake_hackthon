"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const router = (0, express_1.Router)();
// Fetch all users
router.get('/', user_1.getAllUsers);
// Add a user
router.post('/', user_1.addUser);
// Update a user
router.put('/:id', user_1.updateUser);
// Delete a user
router.delete('/:id', user_1.deleteUser);
// Fetch single user
router.get('/:id', user_1.getSingleUser);
exports.default = router;
