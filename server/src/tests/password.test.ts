import { validatePassword } from "../utils/password";


const test_password = [

    ["", 20, false, "mot de passe vide"],
    ["Ab1!", 20, false, "mot de passe trop court (<8)"],
    ["Abcdefghijklmnopqrstu1!", 20, false, "mot de passe trop long (>20)"],
    // ENFANT (<12)
    ["abcdefgh", 10, true, "enfant avec minuscules seulement"],
    ["ABCDEFGH", 10, false, "enfant sans minuscule"],
    // ADULTE (12-64)
    ["abcdefg1!", 20, false, "adulte sans majuscule"],
    ["ABCDEFG1!", 20, false, "adulte sans minuscule"],
    ["Abcdefgh!", 20, false, "adulte sans chiffre"],
    ["Abcdefg1", 20, false, "adulte sans special"],
    ["Abcdefg1!", 20, true, "adulte valide"],
    // SENIOR (>=65)
    ["abcdefghi", 70, false, "senior sans chiffre ni majuscule"],
    ["Abcdefghi", 70, true, "senior avec majuscule"],
    ["abcdefg1", 70, true, "senior avec chiffre"],
];

describe("Password Validator- White Box Testing", () => {
    test.each(test_password)(
        "%s",
        (pwd, age, attendu, description) => {
            expect(validatePassword(pwd as any, age as any)).toBe(attendu)
        }
    )

});