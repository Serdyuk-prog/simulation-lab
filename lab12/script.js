const tranMatrix = [
    [[-0.4], [0.3], [0.1]],
    [[0.4], [-0.8], [0.4]],
    [[0.1], [0.4], [-0.5]],
];

const states = ["Clear", "Cloudy", "Overcast"];
const numOfStates = states.length;
const stateColors = ["#87cbde", "#becdd4", "#c4d3df"];

function getTime(average) {
    let sum = 0;
    let m = 0;

    sum = sum + Math.log(Math.random());
    while (sum >= -average) {
        m++;
        sum = sum + Math.log(Math.random());
    }
    return m;
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

function getState(cur) {
    const posStates = [];
    const probs = [];
    for (let i = 0; i < numOfStates; i++) {
        if (i != cur) {
            posStates.push(i);
            probs.push(tranMatrix[cur][i] / -tranMatrix[cur][cur]);
        }
    }
    return posStates[getFromGroup(probs)];
}

function genTimer(arg) {
    return getTime(arg * 10) * 100;
}

function runSim(N) {
    let state = 0;
    let result = [];
    for (let i = 0; i < N * 5; i++) {
        state = getState(state);
        const time = genTimer(-tranMatrix[state][state]);
        result.push({ state: state, time: time });
    }
    return result;
}

function showAnimation(results, N) {
    for (let i = 0; i < N * 5; i++) {
        setTimeout(function () {
            console.log(results[i].state, results[i].time);
            displayWeather(results[i]);
        }, 1000 * i);
    }
}

function displayWeather(el) {
    const box = document.querySelector("#box");
    const time = document.querySelector("#time");
    box.innerHTML = states[el.state];
    box.style.backgroundColor = stateColors[el.state];
    time.innerHTML = el.time;
}

function showStats(result) {
    stats = [0, 0, 0];
    for (el of result) {
        stats[el.state]++;
    }
    const tds = document.querySelectorAll("td");
    console.log(tds);
    for (let i = 0; i < tds.length; i++) {
        tds[i].innerHTML = stats[i];
    }
}

const button = document.querySelector("button");

button.addEventListener("click", () => {
    button.disabled = true;
    setTimeout(function () {
        button.disabled = false;
    }, 1000 * 5 * 3);
    const result = runSim(3);
    showAnimation(result, 3);
    showStats(result);
});

