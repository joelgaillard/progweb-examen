import Country from "./Country";

class Game {
    #score = 0;

    constructor(countries) {
        this.countries = countries;
        this.countryIndex = 0;
        this.currentCountry = new Country(this.countries[this.countryIndex]);
        this.currentCountry.afficheDrapeau();
    }
    get score() { return this.#score; }

    ajoutePoint() {
        this.#score++;
    }

    partieTerminee() {
        let partieTerminee = this.countryIndex >= this.countries.length ? true : false;
        return partieTerminee;
    }

    paysSuivant() {
        if (!this.partieTerminee()) {
            this.countryIndex++;
            this.currentCountry = new Country(this.countries[this.countryIndex]);
            this.currentCountry.afficheDrapeau();
        }
    }
}
export default Game;