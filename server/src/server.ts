import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/database";
import User from "./models/User";
import { requestLogger } from "./middlewares/logger";
import { GetAllErreur } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import cors from 'cors';

const app = express();
const PORT = 3000;


// En premier de la liste des routes server.ts
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CORS
app.use(cors());

// Parser JSON
app.use(express.json());

// Logger global
app.use(requestLogger);

// Fichiers statiques (ancien frontend)
app.use("/", express.static("public"));

// Routes API
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
            console.log(`Serveur lancé sur : http://localhost:${PORT}`);
            console.log(`Swagger : http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error) => {
        console.error("Erreur lors de la synchronisation :", error);
    });