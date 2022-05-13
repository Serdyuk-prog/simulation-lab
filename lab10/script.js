function getScore(average) {
    let sum = 0;
    let m = 0;

    sum = sum + Math.log(Math.random());
    while (sum >= -average) {
        m++;
        sum = sum + Math.log(Math.random());
    }
    return m;
}

const countries = [
    "AUT",
    "SWE",
    "ESP",
    "GER",
    "ENG",
    "POR",
    "FRA",
    "WAL",
    "IRL",
    "NLD",
    "LUX",
    "CHE",
    "POL",
    "FIN",
    "NOR",
    "GRC",
];

const avScore = 5;

const texts = document.querySelectorAll("text");
const results = document.querySelector("#results");
const start = document.querySelector("button");

for (let text of texts) {
    text.innerHTML = "";
}

for (let i = 0; i < 16; i++) {
    texts[i].innerHTML = countries[i];
}

function runSim() {
    let participants2 = [];
    let participants3 = [];
    let participants4 = [];

    let roundNums = 0;

    function runRound(participants, participantsNext) {
        for (let i = 0; i < participants.length; i = i + 2) {
            let player1 = participants[i];
            let player2 = participants[i + 1];
            let player1res = getScore(avScore);
            let player2res = getScore(avScore);
            let win = "";

            while (player1res == player2res) {
                player1res = getScore(avScore);
                player2res = getScore(avScore);
            }

            if (player1res > player2res) {
                win = player1;
            } else {
                win = player2;
            }

            results.innerHTML =
                results.innerHTML + `${player1} vs ${player2}: (${player1res}:${player2res} - ${win}) <br>`;
            texts[16 + roundNums].innerHTML = win;
            participantsNext.push(win);
            roundNums++;
        }
    }

    results.innerHTML = "Round 1 <br>";
    runRound(countries, participants2);

    results.innerHTML = results.innerHTML + "Round 2 <br>";
    runRound(participants2, participants3);

    results.innerHTML = results.innerHTML + "Round 3 <br>";
    runRound(participants3, participants4);

    results.innerHTML = results.innerHTML + "Fin <br>";
    runRound(participants4, []);
}

start.addEventListener("click", () => {
    runSim();
})
