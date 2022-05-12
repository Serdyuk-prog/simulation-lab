let probs_counts = [];
function runSimulation(numOfTrials, group) {
    let result = [];
    for (let i = 0; i < group.length; i++) {
        probs_counts[i] = 0;
    }

    for (let i = 0; i < numOfTrials; i++) {
        let A = Math.random();
        let k = 0;

        while (A > 0) {
            k++;
            A = A - group[k - 1];
        }

        probs_counts[k - 1]++;
    }
    for (let i = 0; i < group.length; i++) {
        result[i] = probs_counts[i] / numOfTrials;
    }
    return result;
}

// математическое ожидания
function getExp(probs) {
    let result = 0;
    for (let i = 1; i <= probs.length; i++) {
        result += probs[i - 1] * i;
    }
    return Math.round(result * 100) / 100;
}

// дисперсия
function getVariance(probs) {
    let result = 0;
    for (let i = 1; i <= probs.length; i++) {
        result += probs[i - 1] * i * i;
    }
    return Math.round((result - Math.pow(2, getExp(probs))) * 100) / 100;
}

// Хи-квадрат
function getChi(numOfTrials, probs) {
    let result = 0;
    for (let i = 1; i <= probs.length; i++) {
        result += (probs_counts[i - 1] * probs_counts[i - 1]) / (numOfTrials * probs[i - 1]);
        console.log(result);
    }
    return Math.round((result - numOfTrials) * 100) / 100;
}

const formThird = document.querySelector(".third-form");
const results = document.querySelector("#result").querySelectorAll("li");
const calcRes = document.querySelector("#result").querySelector("p");

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
        for (let i = 0; i < data.length; i++) {
            data[i] = Number(data[i]);
        }

        let sum = 0;
        for (let el of data) {
            sum = sum + Number(el);
        }

        if (sum - 1 <= 1) {
            data[data.length - 1] = Math.round((1 - (sum - 1)) * 100) / 100;
            console.log(data);

            const numOfTrials = inputs[inputs.length - 1].value;
            const simRes = runSimulation(numOfTrials, data);
            for (let i = 0; i < results.length; i++) {
                results[i].innerText = simRes[i];
            }
            const tExp = getExp(data);
            const tVar = getVariance(data);
            const eExp = getExp(simRes);
            const eVar = getVariance(simRes);
            const chi = getChi(Number(numOfTrials), data);

            calcRes.innerHTML = `Average: ${eExp} (error = ${Math.abs(Math.floor(((eExp - tExp) / eExp) * 100))}%)<br>
            Variance: ${eVar} (error = ${Math.abs(Math.floor(((eVar - tVar) / eVar) * 100))}%)<br>
            Chi-squared: ${chi} > 9.488 is ${chi > 9.488}`;
        } else {
            alert("Sum of props is > than 1");
        }
    });
}
