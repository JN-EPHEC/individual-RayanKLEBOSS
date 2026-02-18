import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/database.ts";
import User from "./models/User";

const app = express();
const PORT = 3000;

app.use(express.json());

const Path = "/api/data";



// type Etudiant = {
//     id: number;
//     nom: string;
//     prenom: string;
// };

// const etudiants: Etudiant[] = [
//     { id: 1, nom: "Dupont", prenom: "Jean" },
//     { id: 2, nom: "Martin", prenom: "Sophie" },
//     { id: 3, nom: "Doe", prenom: "John" },
// ];

app.get("/", (req: Request, res: Response) => {
    res.send("Bienvenue sur mon serveur API");
});

app.get("/api/data", async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
});

app.post("/api/data", async (req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body;

        if (!nom || !prenom) {
            return res.status(400).json({ error: "Nom et prénom sont requis" });
        }

        const newUser = await User.create({ nom, prenom });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
});


app.delete("/api/data/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleted = await User.destroy({
            where: { id: Number(id) }
        });

        if (deleted) {
            res.json({ message: "Utilisateur supprimé" });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
});

app.get("/api/hello/:name", (req: Request, res: Response) => {
    // récupérer le paramètre `name`
    const name = req.params.name;

    // créer la réponse JSON
    res.json({
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString()
    });
});

app.use("/api", userRoutes);

sequelize.sync()
    .then(() => {
        console.log("Base de données synchronisée");

        app.listen(PORT, () => {
            console.log(`Serveur lancé sur http://localhost:${PORT}${Path}`);
        });
    })
    .catch((error) => {
        console.error("Erreur lors de la synchronisation :", error);
    });