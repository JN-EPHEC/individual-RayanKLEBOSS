import type { Request, Response } from "express";
import User from "../models/User";

export const getAllusers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

export const AddUser = async (req: Request, res: Response) => {
    try {
        // On prend firstName et lastName du req.body (envoyé par le script.js)
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Données invalides" });
    }
};

export const DeleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User non trouvé" });
        await user.destroy();
        res.json({ message: "Supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
};