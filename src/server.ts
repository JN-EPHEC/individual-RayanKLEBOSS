import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 3000;

const Path = "/api/data";

app.use("/api", userRoutes);


type Etudiant = {
    id: number;
    nom: string;
    prenom: string;
};

const etudiants: Etudiant[] = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];

app.get("/", (req: Request, res: Response) => {
    res.send("Bienvenue sur mon serveur API");
});

app.get("/api/data", (req: Request, res: Response) => {
    res.json(etudiants);
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



app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}${Path}`);
});