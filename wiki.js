let searchInputEl = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppend(item) {

    let {
        title,
        link,
        description
    } = item;

    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.textContent = title;
    searchResults.appendChild(resultTitle);

    let breakEl1 = document.createElement("br");
    searchResults.appendChild(breakEl1);

    let ulrEl = document.createElement("a");
    ulrEl.textContent = link;
    ulrEl.classList.add("result-url");
    searchResults.appendChild(ulrEl);

    let breakEl2 = document.createElement("br");
    searchResults.appendChild(breakEl2);

    let descriptionEl = document.createElement("a");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    searchResults.appendChild(descriptionEl);

    let breakEl3 = document.createElement("br");
    searchResults.appendChild(breakEl3);
}

function dispaySearch(search_results) {
    spinner.classList.toggle("d-none");
    for (let item of search_results) {
        createAndAppend(item);
    }
}

function searchWekipedia(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle("d-none");

        let searchInputValue = searchInputEl.value;
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                dispaySearch(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWekipedia);