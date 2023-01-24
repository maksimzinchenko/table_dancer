const tableDancerParams = {
    'selectTable': true
}

let dragDropElement;
let dragX, dragY;
let dragRow, dragColumn;
let startDrag = false;

window.addEventListener('load', initDancer);
document.body.addEventListener('mousedown', startDragListener);
document.body.addEventListener('mouseup', dropDragListener);

async function addMessageListeners() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.command === "updateView") {
            readOldDancerParamsFromStorage();
        }
        sendResponse(true);
    });
}


async function initDancer(event) {
    await readOldDancerParamsFromStorage();
    await addMessageListeners();
    addAllTableBorderHoverListener();
}


async function readOldDancerParamsFromStorage() {
    chrome.storage.local.get("tableDancerParams", (result) => {
        if (('tableDancerParams' in result) === false) {
            chrome.storage.local.set(
                {
                    tableDancerParams: tableDancerParams
                },
                function () {
                    console.log('Old params not founs. Default values were written.. ');
                }
            );
        } else {
            tableDancerParams['selectTable'] = result['tableDancerParams']['selectTable'];
            console.log('Table dancer old params were found in storage. Loaded');
        }
        markupBorderTables();
    });
}


function startDragListener(event){
    if (['TD'].includes(event.target.nodeName)){
        dragDropElement = event.target;
        dragX = event.clientX;
        dragY = event.clientY;
        startDrag = true;
        event.preventDefault();
    } 
} 

function dropDragListener(event){
    if (startDrag){
        if (Math.abs(dragX - event.clientX) > Math.abs(dragY - event.clientY)){
            parentRow = dragDropElement.parentNode;
            parentRow.classList.add('table_row_select');
        } else {
            tableRowsParent = dragDropElement.parentNode.parentNode;
            tdIndex = dragDropElement.cellIndex;

            for (tableRow of tableRowsParent.children){
                console.log(tableRow.children[tdIndex]);
                if (!!tableRow.children[tdIndex]){
                    tableRow.children[tdIndex].classList.add('table_row_select');
                }
                
            }
        }
        startDrag = false;
        event.preventDefault();
    }
}


function markupBorderTables() {
    let tables = document.getElementsByTagName('table');
    if (tableDancerParams['selectTable'] === true) {
        for (const tableElement of tables) {
            tableElement.classList.add('border_select');
        }
    } else {
        for (const tableElement of tables) {
            tableElement.classList.remove('border_select');
        }
    }
}


function addAllTableBorderHoverListener() {
    let tables = document.getElementsByTagName('table');
    for (const tableElement of tables) {
        addTableListeners(tableElement);
    }
}


function addTableListeners(tableElement) {
    tableElement.addEventListener('mouseover', fillSelection);
    tableElement.addEventListener('mouseout', emptySelection);
    tableElement.addEventListener('click', event => {
        if (['TABLE', 'TR', 'TD'].includes(event.target.nodeName)) {
            event.target.classList.toggle('table_select');
        }
    })
}



function fillSelection(event) {
    if (['TABLE', 'TR', 'TD'].includes(event.target.nodeName)) {
        event.target.classList.add('hover_select');
    }
}

function emptySelection(event) {
    if (['TABLE', 'TR', 'TD'].includes(event.target.nodeName)) {
        event.target.classList.remove('hover_select');
    }
}



