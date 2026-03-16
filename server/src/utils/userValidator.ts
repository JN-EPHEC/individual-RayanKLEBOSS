export function validateUserRegistration(
    age: number,
    role: string,
    email: string
): boolean {

    if (typeof age !== "number" || isNaN(age)) {
        return false;
    }

    const validRoles = ["admin", "user", "stagiaire"];

    if (!validRoles.includes(role)) {
        throw new Error("Rôle invalide");
    }

    if (age > 120) {
        throw new Error("Âge invalide");
    }

    if (age < 18) {
        if (role === "stagiaire") {
            return true;
        }
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        return false;
    }

    return true;
}