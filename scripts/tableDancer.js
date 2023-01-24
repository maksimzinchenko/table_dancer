
function fillSelection(event) {
    if (event.target.nodeName == 'TABLE'){
        event.target.style.border = "8px solid blue";
    }
}

function emptySelection(event) {
    if (event.target.nodeName == 'TABLE'){
        event.target.style.border = "4px dashed red";
    }
}



function startDancer(event){
    let tables = document.getElementsByTagName('table');
    for (const tableElement of tables){
        tableElement.style.border = "4px dashed red";
        tableElement.addEventListener('mouseover', fillSelection);
        tableElement.addEventListener('mouseout', emptySelection);
    }
    
}

window.addEventListener('load', startDancer);



