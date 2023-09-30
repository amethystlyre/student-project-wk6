var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

var queryString = document.location.search;
var format = "search";
var query = "";
var queryText = "";
var baseURL = `https://www.loc.gov/${format}/?q=${queryString}&fo=json`;

formatUserQuery(queryString);

function formatUserQuery(queryString) {
    let list = queryString.split("&");
    //console.log(list);

    let userQ = list[0].split("=")[1];

    if (userQ.includes("%20")) {
        queryText = userQ.replaceAll("%20", " ");
    }
    else { queryText = userQ }

    let userF = list[1].split("=")[1];

    if (!userQ || userQ == "") {
        alert("Nothing to search for.");
    } else if (!userF || userF == "") {
        queryString = userQ;
    } else if (userF && userQ) {
        format = userF;
        queryString = userQ;
        resultTextEl.textContent = queryText;
    } else {
        location.assign("/index.html");
    }

}


fetchData(baseURL);

function fetchData(url) {
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                //console.log(response);
                response.json()
                    .then(data => processData(data))
            }
            else {
                alert("Error fetching data: " + response.statusText);
            }
        })
        .catch();
}

function processData(data) {
    if (!data || data.length === 0) {
        return;
    }
    let results = data.results;
    for (let item of results) {
        let title = item.title;
        let date = item.date;
        let subject = item.subject;
        let description = item.description[0];
        let linkId = item.id;
        renderResult(title, date, subject, description, linkId);
    }

}


function renderResult(title, date, subject, description, linkId) {
    let divCard = document.createElement("div");
    divCard.setAttribute("class", "card bg-light text-dark mb-3 p-3");
    let divBody = document.createElement("div");
    divBody.setAttribute("class", "card-body");

    let heading = document.createElement("h3");
    heading.textContent = title;
    let content = document.createElement("p");
    content.innerHTML = `<strong>Date:</strong> ${date}<br>
   <strong>Subjects:</strong> ${subject} <br>
   <strong>Description:</strong> ${description}`;
    let link = document.createElement("a");
    link.textContent = "Read More";
    link.setAttribute("class", "btn btn-dark");
    link.setAttribute("href", linkId);

    divBody.append(heading,content,link)
    divCard.appendChild(divBody);
    resultContentEl.appendChild(divCard);

}


searchFormEl.addEventListener("submit", searchHandler);
