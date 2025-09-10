export interface Monster {
  id: string;
  name: string;
  size: string;
  type: string;
  aligment: string;
  armorClass: {
    type: string;
    value: number;
  };
  hitPoints: number;
  hitDice: string;
  hitPointsRoll: string;
  speed: {
    walk: string;
    fly: string;
    swim: string;
  };
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: {
    value: number;
    proficiency: {
      name: string;
    };
  }[];
  damageVulnerabilities: any[];
  damageResistances: any[];
  damageInmmunities: string[];
  conditionInmmunities: string[];
  challengeRating: number;
  proficiencyBonus: number;
  experience: number;
  specialhabilities: {
    name: string;
    description: string;
    damage: any[];
  }[];
  imageURL: string;
}
