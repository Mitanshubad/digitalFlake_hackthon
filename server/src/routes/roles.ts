import { Router } from 'express';
import {
  getAllRoles,
  getRoleById,
  addRole,
  updateRole,
  deleteRole,
} from '../controller/roles';

export const rolesRouter = Router();

// Define routes
rolesRouter.get('/', getAllRoles);
rolesRouter.get('/:id', getRoleById);
rolesRouter.post('/', addRole);
rolesRouter.put('/:id', updateRole);
rolesRouter.delete('/:id', deleteRole);
