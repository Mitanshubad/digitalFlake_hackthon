import { Request, Response } from 'express';
import { Role } from '../models/Role';

// Get all roles
export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    // Casting error as Error type to access the message
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to fetch roles', error: error.message });
    } else {
      res.status(500).json({ message: 'Failed to fetch roles', error: String(error) });
    }
  }
};

// Get a role by ID
export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await Role.findById(req.params.id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching role', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching role', error: String(error) });
    }
  }
};

// Add a new role
export const addRole = async (req: Request, res: Response) => {
  const { roleName, status } = req.body;

  if (!roleName || !status) {
    return res.status(400).json({ message: 'Role name and status are required' });
  }

  const newRole = new Role({ roleName, status });

  try {
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to create role', error: error.message });
    } else {
      res.status(500).json({ message: 'Failed to create role', error: String(error) });
    }
  }
};

// Update a role
export const updateRole = async (req: Request, res: Response) => {
  const { roleName, status } = req.body;

  if (!roleName || !status) {
    return res.status(400).json({ message: 'Role name and status are required' });
  }

  try {
    const role = await Role.findByIdAndUpdate(req.params.id, { roleName, status }, { new: true });
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error updating role', error: error.message });
    } else {
      res.status(500).json({ message: 'Error updating role', error: String(error) });
    }
  }
};

// Delete a role
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (role) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error deleting role', error: error.message });
    } else {
      res.status(500).json({ message: 'Error deleting role', error: String(error) });
    }
  }
};
