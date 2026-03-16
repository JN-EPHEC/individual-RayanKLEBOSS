import { Request, Response, NextFunction } from "express";

export const GetAllErreur = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("erreur attrapée par le middlewares global", err);
    // pour le moment je garde le any pour err mais c est pas une bonne utilisation car 
    // ils vont prendre tt les erreurs sans verifier les types , la bonne utilisation c est mettre unknow en paramètre
    // Récupère le statut par défaut 500 
    const status = err.status || 500;
    const message = err.message || "Erreur interne du serveur";

    // réponse JSON dynamique
    res.status(status).json({
        error: message
    });
};