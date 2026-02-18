import { Router, Request, Response } from "express";
import User from '../models/User';

const router = Router();

// GET /api/users -> Récupérer tout le monde
router.get('/', async (req: Request, res: Response) => {
  try {
    const tUsers = await User.findAll();
    res.json(tUsers);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/users -> Ajouter un étudiant
router.post('/', async (req: Request, res: Response) => {
  try {
    // On prend firstName et lastName du req.body (envoyé par le script.js)
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Données invalides" });
  }
});

// DELETE /api/users/:id -> Supprimer (Bonus TP2)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User non trouvé" });
    await user.destroy();
    res.json({ message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

export default router;