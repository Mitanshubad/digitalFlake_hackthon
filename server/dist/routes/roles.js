"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRouter = void 0;
const express_1 = require("express");
const roles_1 = require("../controller/roles");
exports.rolesRouter = (0, express_1.Router)();
// Define routes
exports.rolesRouter.get('/', roles_1.getAllRoles);
exports.rolesRouter.get('/:id', roles_1.getRoleById);
exports.rolesRouter.post('/', roles_1.addRole);
exports.rolesRouter.put('/:id', roles_1.updateRole);
exports.rolesRouter.delete('/:id', roles_1.deleteRole);
