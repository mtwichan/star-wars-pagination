export class SwapiAPI {
    static BASE_URL = "https://swapi.dev/api/";

    static async getPlanets (page: number) {
        const response = await fetch(
            `${this.BASE_URL}/planets/?page=${page}`
          );
    
          if (!response.ok) throw response;
    
          const result = await response.json();
          return result
    }
 
}