import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import HeroType from "../types/HeroType";
import { BattleType } from "../types/BattleType";
const TAG = "API";
class api {
  static instance: any;
  constructor() {
    if (typeof api.instance === "object") {
      return api.instance;
    }
    api.instance = this;
    //this.allBusiness = null;
    return this;
  }
  searchHeroesByName(name: string) {
    const saveLastSearch = () => {
      AsyncStorage.setItem(`lastSearchSaved`, name);
    };

    const analiceData = (arr, resolve) => {
      saveLastSearch();
      const res: Array<HeroType> = [];
      for (const key in arr) {
        if (!Object.prototype.hasOwnProperty.call(arr, key)) {
          continue;
        }
        const element = arr[key];
        res.push(new HeroType(element));
      }
      resolve(res);
    };

    const getFromWeb = (encodeName, resolve, reject) => {
      const theUrl = `https://www.superheroapi.com/api.php/870124487160923/search/${encodeName}`;
      axios
        .get(theUrl)
        .then(function (response) {
          const arr = response.data.results;
          AsyncStorage.setItem(
            `searchHeroesByName/${encodeName}`,
            JSON.stringify(arr),
          )
            .then((res) => {
              console.log(TAG, `searchHeroesByName/${encodeName} saved`);
            })
            .catch((err) => {
              console.log(TAG, `searchHeroesByName/${encodeName} fail saved`);
            });
          analiceData(arr, resolve);
        })
        .catch(function (error) {
          reject("API-FAIL");
        });
    };
    const getFromLocal = (encodeName, resolve, reject) => {
      AsyncStorage.getItem(`searchHeroesByName/${encodeName}`)
        .then((data) => {
          if (data == null) {
            getFromWeb(encodeName, resolve, reject);
            return;
          }
          analiceData(JSON.parse(data), resolve);
        })
        .catch((err) => {
          getFromWeb(encodeName, resolve, reject);
        });
    };

    return new Promise<Array<HeroType>>((resolve, reject) => {
      try {
        if (!/^[a-z0-9]+$/i.test(name)) {
          reject(`NOT PASS REGEX ALFANUM (${name})`);
          return;
        }
        const encodeName = encodeURI(name);
        getFromLocal(
          encodeName,
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          },
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  getLastSearch() {
    return new Promise<string>((resolve, reject) => {
      try {
        AsyncStorage.getItem(`lastSearchSaved`)
          .then((data) => {
            if (data !== null) {
              resolve(data);
              return;
            }
            reject(null);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  saveBattle(battle: BattleType) {
    console.log(TAG, "Saved battle");
    const path = `last100BattleSaved`;
    AsyncStorage.getItem(path)
      .then((data) => {
        let arr: Array<BattleType> = [];
        let json = {};
        let counter = 0;

        if (data !== null) {
          json = JSON.parse(data);
        }
        for (const key in json) {
          if (!Object.prototype.hasOwnProperty.call(json, key)) {
            continue;
          }
          counter++;
          const element = json[key];
          arr.push(new BattleType(element));
          if (counter > 98) {
            break;
          }
        }
        arr.push(battle);
        AsyncStorage.setItem(path, JSON.stringify(arr));
        console.log(TAG, arr);
      })
      .catch((err) => {
        console.log(TAG, "saveBattle fail", err);
      });
  }
  getBattleHistory() {
    const path = `last100BattleSaved`;
    return new Promise<Array<BattleType>>((resolve, reject) => {
      try {
        AsyncStorage.getItem(path)
          .then((data) => {
            let arr: Array<BattleType> = [];
            let json = {};
            let counter = 0;

            if (data !== null) {
              json = JSON.parse(data);
            }

            for (const key in json) {
              if (!Object.prototype.hasOwnProperty.call(json, key)) {
                continue;
              }
              counter++;
              const element = json[key];
              arr.unshift(new BattleType(element));
            }
            //console.log(TAG, arr);
            resolve(arr);
          })
          .catch((err) => {
            console.log(TAG, "saveBattle fail", err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
}
export default new api();
