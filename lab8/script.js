function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getFromGroup(group) {
    let A = Math.random();
    let k = 0;
    while (A > 0) {
        k++;
        A = A - group[k - 1];
    }
    return k - 1;
}

function runSimulation(numOfTrials, group) {
    let result = [];
    for (let i = 0; i < group.length; i++) {
        result[i] = 0;
    }

    for (let i = 0; i < numOfTrials; i++) {
        let A = Math.random();
        let k = 0;

        while (A > 0) {
            k++;
            A = A - group[k - 1];
        }

        result[k - 1]++;
    }

    for (let i = 0; i < group.length; i++) {
        result[i] = result[i] / numOfTrials;
    }
    return result;
}

const formFirst = document.querySelector(".first-form");
const firstYes = document.querySelector("#first-yes");
const firstNo = document.querySelector("#first-no");

if (formFirst) {
    formFirst.addEventListener("submit", (event) => {
        firstYes.hidden = true;
        firstNo.hidden = true;
        event.preventDefault();
        if (getRandomInt(2) == 1) {
            firstYes.hidden = false;
        } else {
            firstNo.hidden = false;
        }
    });

    formFirst.querySelector("input").addEventListener("input", () => {
        firstYes.hidden = true;
        firstNo.hidden = true;
    });
}

const formSecond = document.querySelector(".second-form");
const secondAnswer = document.querySelector("#second-answer");
const answers = [
    "Yes definitely",
    "It is certain",
    "Reply hazy, try again",
    "Ask again later",
    "My reply is no",
    "Very doubtful",
];
const answersProb = [0.15, 0.2, 0.1, 0.25, 0.17, 0.13];

if (formSecond) {
    formSecond.addEventListener("submit", (event) => {
        event.preventDefault();
        secondAnswer.hidden = true;
        secondAnswer.hidden = false;
        secondAnswer.innerText = answers[getFromGroup(answersProb)];
    });

    formSecond.querySelector("input").addEventListener("input", () => {
        secondAnswer.hidden = true;
    });
}

const formThird = document.querySelector(".third-form");
const results = document.querySelector("#result").querySelectorAll("li");

if (formThird) {
    formThird.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputs = formThird.querySelectorAll("input");
        let data = [];
        for (let input of inputs) {
            if (input.classList.contains("prop")) {
                data.push(input.value);
            }
        }
        let sum = 0;
        for (let el of data) {
            sum = sum + Number(el);
        }
        if (sum - 1 <= 1) {
            const numOfTrials = inputs[inputs.length - 1].value;
            const simRes = runSimulation(numOfTrials, data);
            for (let i = 0; i < results.length; i++) {
                results[i].innerText = simRes[i];
            }
        } else {
            alert("Sum of props is > than 1")
        }
    });
}