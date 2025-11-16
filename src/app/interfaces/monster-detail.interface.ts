export interface MonsterDetail {
  id: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  damageImmunities: string[];
  armorClass: {
    type: string;
    value: number;
  };
  senses: {
    name: string;
    value: string;
  }[];
  hitPoints: number;
  hitDice: string;
  hitPointsRoll: string;
  languages: string;
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
  actions: {
    name: string;
    desc: string;
    damage: {
      type: string;
      dice: string;
    }[];
  }[];
  specialAbilities: {
    name: string;
    desc: string;
    damage: any[];
    usage: {
      type: string;
      times: number;
      rest: string[];
    };
  }[];
  legendaryActions: {
    name: string;
    desc: string;
    damage: {
      damageType: {
        name: string;
      };
      damageDice: string;
    }[];
  }[];
  savingThrows?: {
    name: string;
    value: number;
  }[];
  abilities?: {
    name: string;
    value: number;
  }[];
  imageURL: string;
}
