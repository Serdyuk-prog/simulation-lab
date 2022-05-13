function getNorm(mean, vari) {
    let result = 0;
    for (let i = 0; i < 12; i++) {
        result = result + Math.random();
    }
    console.log(mean);
    result = Math.sqrt(vari) * (result - 6) + mean;
    return Math.round(result * 1000) / 1000;
}

function calcValues() {
    for (let i = 0; i < N; i++) {
        values.push(getNorm(mean, vari));
    }
}

function getGrid() {
    let min = Math.floor(Math.min(...values));
    let max = Math.round(Math.max(...values));
    let k = Math.round(Math.log2(N)) + 1;
    let interval = Math.round((max - min) / k);
    for (let i = 0; i < k; i++) {
        grid.push([min, min + interval, 0]);
        min += interval;
    }
}

function fillGrid() {
    for (let el of values) {
        for (let column of grid) {
            if (el > column[0] && el <= column[1]) {
                column[2]++;
            }
        }
    }
}

// ожидание
function getExp() {
    let result = 0;
    for (let i = 0; i < values.length; i++) {
        result = result + values[i];
    }
    result = result / N;
    return Math.round(result * 100) / 100;
}

// дисперсия
function getVariance() {
    let result = 0;
    for (let i = 0; i < values.length; i++) {
        result += values[i] * values[i];
    }
    result = result / N;
    return Math.round(result * 100) / 100;
}

let N = 100;
let mean = 0;
let vari = 2;
let values = [];
let grid = [];
let myChart = null;

function runSim() {
    N = document.querySelector("#size").value;
    mean = document.querySelector("#mean").value;
    vari = document.querySelector("#variance").value;
    values = [];
    grid = [];

    calcValues();
    getGrid();
    fillGrid();

    let labels = [];
    let dataset = [];

    for (let column of grid) {
        let string = `(${column[0]};${column[1]}]`;
        labels.push(string);
        dataset.push(column[2]);
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: "ormal distribution",
                data: dataset,
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgb(0, 0, 0)"],
                borderWidth: 1,
            },
        ],
    };

    const config = {
        type: "bar",
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };

    if (myChart != null) {
        myChart.destroy();
    }
    myChart = new Chart(document.getElementById("myChart"), config);

    const calcRes = document.querySelector("p");
    const eExp = getExp();
    const eVar = getVariance();
    calcRes.innerHTML = `Average: ${eExp} <br>
            Variance: ${eVar}<br>`;
}

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    runSim();
});
