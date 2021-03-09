const TAG = "HERO TYPE";
class HeroPowerStats {
  combat: number;
  durability: number;
  intelligence: number;
  power: number;
  speed: number;
  strength: number;
  constructor(data) {
    if (typeof data === "undefined") {
      return;
    }
    if (typeof data.combat === "undefined") {
      return;
    }
    function checkVal(val: string): number {
      if (isNaN(parseInt(val))) {
        return 0;
      }
      return parseInt(val);
    }
    this.combat = checkVal(data.combat);
    this.durability = checkVal(data.durability);
    this.intelligence = checkVal(data.intelligence);
    this.power = checkVal(data.power);
    this.speed = checkVal(data.speed);
    this.strength = checkVal(data.strength);
  }
}
export default class HeroType {
  id: string;
  name: string;
  urlImage: string;
  appearance: any;
  biography: any;
  connections: any;
  image: any;
  powerstats: HeroPowerStats;
  work: any;
  description: string;

  constructor(data) {
    //console.log(TAG, data);
    this.id = data.id || "";
    this.name = data.name || "";
    this.urlImage = "";
    if (typeof data.image !== "undefined") {
      this.urlImage = data.image.url;
      this.image = data.image;
    }
    this.appearance = data.appearance || "";
    this.description = "";
    if (typeof data.appearance !== "undefined") {
      if (typeof data.appearance.gender !== "undefined") {
        this.description = `Gander: ${data.appearance.gender} Race:${data.appearance.race}`;
      }
    }
    this.powerstats = new HeroPowerStats(data.powerstats);
  }
}
