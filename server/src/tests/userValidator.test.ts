// src/tests/userValidator.test.ts
import { validateUserRegistration } from "../utils/userValidator";

describe("validateUserRegistration - tests Pairwise", () => {

    // Cas normaux / false
    const validCases: Array<[number, string, string, boolean]> = [
        [30, "user", "test@mail.com", true],          // âge normal, role user, email valide
        [17, "user", "test@mail.com", false],         // <18, role non stagiaire
        [17, "stagiaire", "test@mail.com", true],     // <18, role stagiaire
        [30, "admin", "testmail.com", false],         // email sans @
        [30, "user", "test@mailcom", false],          // email sans .
        [120, "admin", "admin@mail.com", true],       // âge limite haute
        [NaN, "user", "test@mail.com", false],        // âge invalide (NaN)
    ];

    test.each(validCases)(
        "age=%p role=%s email=%s => %s",
        (age, role, email, expected) => {
            expect(validateUserRegistration(age, role, email)).toBe(expected);
        }
    );

    // Cas erreurs pour exceptions
    const errorCases: Array<[number, string, string, string]> = [
        [121, "user", "test@mail.com", "Âge invalide"],   // âge > 120
        [30, "manager", "test@mail.com", "Rôle invalide"], // role invalide

    ];

    test.each(errorCases)(
        "age=%p role=%s email=%s throws %s",
        (age, role, email, message) => {
            expect(() => validateUserRegistration(age, role, email)).toThrow(message);
        }
    );

});