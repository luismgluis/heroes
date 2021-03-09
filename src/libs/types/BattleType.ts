import HeroType from "./HeroType";
interface BattleWinner {
  result: "winner" | "tie";
  hero?: HeroType;
}
export interface BattleTypeProps {
  hero1: HeroType;
  hero2: HeroType;
  confrontation: "speed" | "power";
}
export class BattleType {
  hero1: HeroType;
  hero2: HeroType;
  confrontation: "speed" | "power";
  winner: BattleWinner;
  loser: HeroType;
  constructor(data: BattleTypeProps) {
    this.hero1 = data.hero1;
    this.hero2 = data.hero2;
    this.confrontation = data.confrontation;
    this.fight();
  }
  fight(): BattleWinner {
    if (this.confrontation == "speed") {
      this.confrontationRace(this.hero1, this.hero2);
    }
    if (this.confrontation == "power") {
      this.confrontationPower(this.hero1, this.hero2);
    }
    return this.winner;
  }

  confrontationRace = (hero1: HeroType, hero2: HeroType) => {
    const p1 = hero1.powerstats;
    const p2 = hero2.powerstats;
    if (p1.speed == p2.speed) {
      this.winner = {
        result: "tie",
      };
      return;
    }
    if (p1.speed > p2.speed) {
      this.winner = {
        result: "winner",
        hero: hero1,
      };
      this.loser = hero2;
      return;
    }
    this.winner = {
      result: "winner",
      hero: hero2,
    };
    this.loser = hero1;
  };
  confrontationPower = (hero1: HeroType, hero2: HeroType) => {
    const p1 = hero1.powerstats;
    const p2 = hero2.powerstats;
    if (p1.power == p2.power) {
      this.winner = {
        result: "tie",
      };
      return;
    }
    if (p1.power > p2.power) {
      this.winner = {
        result: "winner",
        hero: hero1,
      };
      this.loser = hero2;
      return;
    }
    this.winner = {
      result: "winner",
      hero: hero2,
    };
    this.loser = hero1;
  };
}
