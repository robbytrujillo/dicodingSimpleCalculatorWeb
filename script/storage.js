const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined";
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

//Struktur data JSON --> local Storage
// [
//     {
//         "firstNumber": "23",
//         "secondNumber": "15",
//         "operator": "-",
//         "result": 8
//     },
//     {
//         "firstNumber": "23",
//         "secondNumber": "6",
//         "operator": "-",
//         "result": 17
//     }
//  ]


// Fungsi ini mengembalikan nilai array dari localStorage 
// jika sudah memiliki nilai sebelumnya melalui JSON.parse().
// Namun jika localStorage masih kosong, fungsi ini akan 
// mengembalikan nilai array kosong.
function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    // selalu hapus konten HTML pada element historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();

