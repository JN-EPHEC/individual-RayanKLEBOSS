import { Router } from "express";
import * as userController from "../controllers/userController";
import { checkIdParam } from "../middlewares/checkIdParam";

const router = Router();

/**
* @swagger
* /api/users:
*   get:
*     summary: Récupère la liste des utilisateurs
*     tags: [Users]
*     responses:
*       200:
*         description: Liste des utilisateurs récupérée avec succès
*       500:
*         description: Erreur serveur
*/
router.get("/", userController.getAllusers);


/**
* @swagger
* /api/users:
*   post:
*     summary: Ajouter un utilisateur
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               firstName:
*                 type: string
*               lastName:
*                 type: string
*     responses:
*       201:
*         description: Utilisateur créé
*       400:
*         description: Données invalides
*/
router.post("/", userController.AddUser);


/**
* @swagger
* /api/users/{id}:
*   get:
*     summary: Récupérer un utilisateur par ID
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Utilisateur trouvé
*       400:
*         description: ID invalide
*       404:
*         description: Utilisateur non trouvé
*/
router.get("/:id", checkIdParam, userController.getUserById);


/**
* @swagger
* /api/users/{id}:
*   put:
*     summary: Mettre à jour un utilisateur
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               firstName:
*                 type: string
*               lastName:
*                 type: string
*     responses:
*       200:
*         description: Utilisateur mis à jour
*       400:
*         description: ID invalide
*       404:
*         description: Utilisateur non trouvé
*/
router.put("/:id", checkIdParam, userController.UpdateUser);


/**
* @swagger
* /api/users/{id}:
*   delete:
*     summary: Supprimer un utilisateur
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Utilisateur supprimé
*       400:
*         description: ID invalide
*       404:
*         description: Utilisateur non trouvé
*/
router.delete("/:id", checkIdParam, userController.DeleteUser);

export default router;