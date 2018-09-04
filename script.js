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
function getRequestObject(){
    try{
        httpRequest = new XMLHttpRequest();
    }
    catch(requestError){
        return false;
    }
    return httpRequest;
}


// this function stops all default validations
function stopSubmission(evt){
    if(evt.preventDefault){
        evt.PreventDefault();
    }
    else{
        evt.returnValue = false;
    }
    getQuote();
}


function getQuote(){
    if(document.getElementsByTagName("input")[0].value){
        entry = document.getElementsByTagName("input")[0].value;
    }
    if(!httpRequest){
        httpRequest = getRequestObject();
    }

    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
}

/* eventhandlers */

// this eventhandler activates when it loads and calls the functions stopSubmission and getRequestObject
var form= document.getElementsByTagName("form")[0];
if(form.addEventListener){
    form.addEventListener("submit",stopSubmission,false);
    window.addEventListener("load",getQuote,false);
}
else if(form.attachEvent){
    form.attachEvent("onsubmit", stopSubmission);
    window.addEventListener("onload",getQuote);
}


if(window.addEventListener){
    window.addEventListener("load",getRequestObject,false);
}
else if(window.attachEvent){
    window.attachEvent("onload", getRequestObject);
}
