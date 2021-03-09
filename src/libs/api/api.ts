import axios from "axios";
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
    return new Promise<string>((resolve, reject) => {
      try {
        if (!/^[a-z0-9]+$/i.test(name)) {
          reject("ALFANUM");
        }
        const encodeName = encodeURI(name);
        axios
          .get(
            `https://www.superheroapi.com/api.php/870124487160923/search/${encodeName}`,
          )
          .then(function (response) {
            // handle success
            console.log(response);
            resolve(response.data);
          })
          .catch(function (error) {
            // handle error
            reject("API-FAIL");
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      } catch (error) {}
    });
  }
}
export default new api();
