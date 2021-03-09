import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import HeroType from "../types/HeroType";
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
    const analice = (arr, resolve) => {
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
          // handle success
          console.log(response);
          const arr = response.data.results;
          AsyncStorage.setItem(
            `searchHeroesByName/${encodeName}`,
            JSON.stringify(arr),
          )
            .then((err) => {
              console.log(TAG, err);
            })
            .catch((err) => {
              console.log(TAG, err);
            });
          analice(arr, resolve);
        })
        .catch(function (error) {
          // handle error
          reject("API-FAIL");
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    };
    const getFromLocal = (encodeName, resolve, reject) => {
      AsyncStorage.getItem(`searchHeroesByName/${encodeName}`)
        .then((data) => {
          if (data == null) {
            getFromWeb(encodeName, resolve, reject);
            return;
          }
          analice(JSON.parse(data), resolve);
        })
        .catch((err) => {
          getFromWeb(encodeName, resolve, reject);
        });
    };

    return new Promise<Array<HeroType>>((resolve, reject) => {
      try {
        if (!/^[a-z0-9]+$/i.test(name)) {
          reject("ALFANUM");
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
}
export default new api();
