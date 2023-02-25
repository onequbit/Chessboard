function setClassEvent(selectorString, eventName, callback)
{
    //
    // https://www.w3schools.com/jsref/dom_obj_event.asp
    // https://www.w3schools.com/tags/ref_eventattributes.asp
    //

    var elements = document.querySelectorAll(selectorString);
    elements.forEach( (element) => {            
        element.addEventListener(eventName, callback);            
    });
}

function setClassContent(selectorString, contentString)
{
    //
    // https://www.w3schools.com/jsref/dom_obj_event.asp
    // https://www.w3schools.com/tags/ref_eventattributes.asp
    //
    var elements = document.querySelectorAll(selectorString);
    elements.forEach( (element) => {
        element.innerText = contentString;            
    });
}

function setOnLoad(selectorstring, callback)
{
    var elements = document.querySelectorAll(selectorstring);
    elements.forEach( (element) => {            
        element.onload = callback(element);
    });
}

function showPopupOnMouseover(e)
{
    console.log(e);
    e.preventDefault();
    alert("foo!");
}