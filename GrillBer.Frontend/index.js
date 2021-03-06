let apiHostBase = `https://localhost:44329/api`;

$(function () {
    // Add click event to "Add New User"
    $("#new-user-btn").click(function () {
        /**@type {User} user */
        let user = {
            FirstName: $("#new-user-first-name").val().toString(),
            LastName: $("#new-user-last-name").val().toString(),
        }

        // $.ajax({
        //     url: `${apiHostBase}/user`,
        //     method: "POST",
        //     data: user
        // }).done(refresh)
        // .fail(function(xhr, status, err) {
        //     alert("Ajax Failed. Is the backend running? Err:" + status)
        // });;
    });

    // Add click event to "Search" button
    $("#search-btn").click(runGrillSearch);

    // Refresh the UI (for the first time)
    refresh();
});

function refresh() {
    // Get cities for the City filter
    $.ajax(`${apiHostBase}/grill`)
        .done(populateCityUi)
        .fail(function (xhr, status, err) {
            alert("Ajax Failed. Is the backend running? Err:" + status)
        });

    // runGrillSearch();
}

function runGrillSearch() {
    let searchParams = {};
    if ($("#cost-select :selected").val() !== "null") {
        searchParams.cost = $("#cost-select : selected").val();
    }
    if ($("#rating-select :selected").val() !== "null") {
        searchParams.rate = $("#rating-select : selected").val();
    }
    if ($("#brand-select :selected").val() !== "null") {
        searchParams.brand = $("#brand-select :selected").val();
    }
    if ($("#model-select :selected").val() !== "null") {
        searchParams.brand = $("#model-select :selected").val();
    }
    if ($("#city-select :selected").val() !== "null") {
        searchParams.brand = $("#city-select :selected").val();
    }
    let searchParamsString = "";
    for (let searchParam in searchParams) {
        if (searchParamsString !== "") {
            searchParamsString += "&";
        }
        searchParamsString += searchParam + "=" + searchParams[searchParam];
    }
    clearSearchResultsAndSayLoading();
    $.ajax({
        url: `${apiHostBase}/grill?${searchParamsString}`,
        method: "GET"
    }).done(populateSearchResults)
        .fail(function (xhr, status, err) {
            alert("Ajax Failed. Is the backend running? Err;" + status)
        });
}

// Add single grill to the search results table

function addGrillToSeachResults(grill) {
    let grillTableBody = $("#grill-list-table tbody");
    let grillRow = $("<tr>");
    grillRow.click(function () {
        window.location.href = "./grill_page/grill_page.html?grillId=" + grill.Id;
    })
    grillRow.append($(`<td>${grill.city}</td>
    <td>${grill.brand}</td>
    <td>${grill.model}</td>
    <td>${grill.cost}</td>
    <td>${grill.rating}</td>`));

    grillRow.addClass("mt-1");
    grillTableBody.append(grillRow);
}

//Clears search results and says loading. Should be used be ajax request to populate with search
function clearSearchResultsAndSayLoading() {
    let grillTable = $("#grill-list-table");
    grillTable.find("tbody").children().remove();
    $("grill-list-div").append($(`<div id="loadingDiv">Loading...</div>`));
}

//removes the loading bar and loads in all grills
function populateSearchResults(grills) {
    $("loadingDiv").remove();
    for (let grill of grills) {
        addGrillToSeachResults(grill);
    }
}

//Loads the City select in the search filter list
function populateCityUi(grills) {
    let citySelect = $('#city-select');
    citySelect.children(`:not([value="null"])`).remove();

    for (let grill of grills) {
        let newCityOption = $('<option>');
        newCityOption.val(grill.Id);
        newCityOption.text(`${grill.City}`);
        citySelect.append(newCityOption);
    }
}

//Loads the cost select in the search filter list
function populateCostUi(grills) {
    let costSelect = $('#cost-select');
    costSelect.children(`:not([value="null"])`).remove();

    for (let grill of grills) {
        let newCostOption = $('<option>');
        newCostOption.val(gill.Id);
        newCostOption.text(`${grill.cost}`);
        costSelect.append(newCostOption);
    }
}








