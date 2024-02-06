import Game from "./Game";
import { shuffle } from "lodash";

if (!!localStorage.getItem("meilleurScore")) {
    document.querySelector("#highscore").innerHTML = `<h1>Highscore: ${localStorage.getItem("meilleurScore")}</h1>`;
}

const apiRequest = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();
    return data;
}

const rendsPays = async () => {
    const pays = await apiRequest();
    return pays;
}

const pageLoad = async () => {
    const pays = await rendsPays();
    const paysMelanges = shuffle(pays);

    const jeu = new Game(paysMelanges);

    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        if (!jeu.partieTerminee()) {
            if (jeu.currentCountry.verifieReponse(document.querySelector("input").value.toString().toLowerCase())) {
                jeu.ajoutePoint();
            };
            document.querySelector("#score").innerHTML = `<h1>Score: ${jeu.score}</h1>`;
            jeu.paysSuivant();
        } else {
            alert(`Game Over! Your score is ${jeu.score}`);
            if (!!localStorage.getItem("meilleurScore")) {
                if (localStorage.getItem("meilleurScore") < jeu.score) {
                    localStorage.removeItem("meilleurScore");
                    localStorage.setItem("meilleurScore", jeu.score);
                }
            } else {
                localStorage.setItem("meilleurScore", jeu.score)
            }
            document.querySelector("form").reset();
            document.querySelector("#highscore").innerHTML = `<h1>Highscore: ${localStorage.getItem("meilleurScore")}</h1>`;
        }

    });

}

pageLoad();

