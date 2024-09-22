"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const router = (0, express_1.Router)();
// Signup Route
router.post('/signup', auth_1.signup);
// Login Route
router.post('/login', auth_1.login);
exports.default = router;
