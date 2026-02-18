import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/database";
import User from "./models/User";

const app = express();
const PORT = 3000;

// 1. MIDDLEWARES DE BASE (Toujours en premier)
// Indispensable pour traiter les données envoyées par le formulaire (req.body)
app.use(express.json()); 

// Sert les fichiers du dossier public (index.html, script.js)
app.use('/', express.static('public'));

// 2. ROUTES API
// On branche le routeur sur /api/users pour correspondre au fetch du script.js
app.use("/api/users", userRoutes);

// Route /api/data synchronisée avec la base de données pour tes tests
app.get("/api/data", async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Erreur API Data:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
});

// Route Hello World (optionnelle)
app.get("/api/hello/:name", (req: Request, res: Response) => {
    const name = req.params.name;
    res.json({
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString()
    });
});

// 3. SYNCHRONISATION DB ET LANCEMENT DU SERVEUR
sequelize.sync()
    .then(() => {
        console.log("Base de données synchronisée");
        app.listen(PORT, () => {
            // Log propre pour cliquer directement sur le lien dans le terminal
            console.log(`Serveur lancé sur : http://localhost:${PORT}`);
            console.log(`Endpoint API : http://localhost:${PORT}/api/data`);
        });
    })
    .catch((error) => {
        console.error("Erreur lors de la synchronisation :", error);
    });