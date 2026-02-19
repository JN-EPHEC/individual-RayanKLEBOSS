import { Router, Request, Response } from "express";
import User from '../models/User';
import * as userController from "../controllers/userController";

const router = Router();

// GET /api/users -> Récupérer tout le monde
router.get("/", userController.getAllusers);

// POST /api/users -> Ajouter un étudiant
router.post('/', userController.AddUser);

// DELETE /api/users/:id -> Supprimer (Bonus TP2)
router.delete('/:id', userController.DeleteUser);

export default router;