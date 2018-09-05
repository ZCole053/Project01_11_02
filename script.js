/*  Project 01_11_02

    Author: Zedekiah Cole 
    Date:   9/4/18

    Filename: script.js
*/

"use strict";

/* Global variables */
var httpRequest = false;
var entry = "^IXIC";


// this function request the option 
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        return false;
    }
    return httpRequest;
}


// this function stops all default validations
function stopSubmission(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    getQuote();
}


function getQuote() {
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }

    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
    clearTimeout(updateQuote);
    var updateQuote = setTimeout('getQuote()', 100000);
}

// this function takes the data and puts it in the dom
function displayData() {
    if (httpRequest.readyState == 4 && httpRequest.status === 200) {
        var stockResults = httpRequest.reponseText;
        var stockItems = stockResults.split(/,|\"/);
        for (var i = stockItems.length - 1; i >= 0; i--) {
            if (stockItems[i] === "") {
                stockItems.splice(i, 1)
            }
        }
        document.getElementById("ticker").innerHTML = stockItems[0];
        document.getElementById("openingprice").innerHTML = stockItems[6];
        document.getElementById("lastTrade").innerHTML = stockItems[1];
        document.getElementById("lastTradeDT").innerHTML = stockItems[2] + "," + stockItems[3];
        document.getElementById("change").innerHTML = stockItems[4];
        document.getElementById("range").innerHTML = (stockItems[8] * 1).toFixed(2) + "&ndash;" + (stockItems[7] * 1).toFixed(2);
        document.getElementById("volume").innerHTML = (stockItems[9] * 1).toLocaleString();
    }
}

// This function for mates the table to holdthat data
function formatTable() {
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.background = "#9FE098";
    }
}

/* eventhandlers */

// this eventhandler activates when it loads and calls the functions stopSubmission and getRequestObject
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", formatTable, false);
    window.addEventListener("load", getQuote, false);
} else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", formatTable);
    window.attachEvent("onload", getQuote);
}