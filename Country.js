class Country {
    constructor(donneesPays) {
        this.donneesPays = donneesPays;
    }
    get drapeau() { return this.donneesPays.flag; }

    bonnesReponses() {
        const langues = Object.values(this.donneesPays.translations);
        // const languesMinuscule = langues.map(langue => langue.toString().toLowerCase());
        const setLangues = new Set();
        langues.forEach(langue => {
            setLangues.add(langue.common.toString().toLowerCase());
        });
        return setLangues;
    }

    verifieReponse(reponse) {
        let bonneReponse = false;
        if (this.bonnesReponses().has(reponse)) {
            bonneReponse = true;
        }
        return bonneReponse;
    }

    afficheDrapeau() {
        document.querySelector("#flag").innerHTML = "";
        const drapeau = document.createElement("h1");
        drapeau.textContent = `${this.drapeau}`;
        document.querySelector("#flag").appendChild(drapeau);
    }

}
export default Country;