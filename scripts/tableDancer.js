window.addEventListener('load', startDancer);

function startDancer(event) {
    let tables = document.getElementsByTagName('table');
    for (const tableElement of tables) {
        markTables(tableElement);
        addTableListeners(tableElement);
    }
}

function addTableListeners(tableElement) {
    tableElement.addEventListener('mouseover', fillSelection);
    tableElement.addEventListener('mouseout', emptySelection);
}

function markTables(tableElement){
    tableElement.style.border = "4px dashed red";
}

function fillSelection(event) {
    if (event.target.nodeName == 'TABLE') {
        event.target.style.border = "8px solid blue";
    }
}

function emptySelection(event) {
    if (event.target.nodeName == 'TABLE') {
        event.target.style.border = "4px dashed red";
    }
}



