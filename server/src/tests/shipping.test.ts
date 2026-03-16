/// <reference types="jest" />
import { calculateShipping } from "../utils/shipping";

const test_shipping = [
  [-1, 5, "standard", 'Invalid distance', 'ID1: Distance négative'],
  [20, 10, "express", 30, "courte + Lourd + express"],
  [51, -5, "express", 'Invalid weight', 'ID2: Poids nul ou négatif'],
  [51, 10, "standard", 37.5, "moyenne + lourd + standard"],
  [501, 5, "express", 100, "Longue + leger + express"],
  [501, 51, "standard", 'Invalid weight', 'ID3: Poids trop lourd']
]

test.each(test_shipping)(
  "%s",
  (distance, poids, type, attendu, description) => {
    if (typeof attendu === 'string') {
      expect(() => calculateShipping(distance as any, poids as any, type as any)
      ).toThrow(attendu);
    } else {

      expect(calculateShipping(distance as any, poids as any, type as any)
      ).toBe(attendu);
    }
  }
);
