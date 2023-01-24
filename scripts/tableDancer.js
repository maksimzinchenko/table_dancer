const tableDancerParams = {
    'selectTable': true
}

window.addEventListener('load', initDancer);

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


function markupBorderTables() {
    if (tableDancerParams['selectTable'] === true) {
        let tables = document.getElementsByTagName('table');
        for (const tableElement of tables) {
            tableElement.classList.add('border_select');
        }
    } else {
        let tables = document.getElementsByTagName('table');
        for (const tableElement of tables) {
            tableElement.classList.remove('border_select');
        }
    }
}


function addAllTableBorderHoverListener(){
    let tables = document.getElementsByTagName('table');
        for (const tableElement of tables) {
            addTableListeners(tableElement);
        }
}


function addTableListeners(tableElement) {
    tableElement.addEventListener('mouseover', fillSelection);
    tableElement.addEventListener('mouseout', emptySelection);
}



function fillSelection(event) {
    if (event.target.nodeName == 'TABLE') {
        event.target.classList.add('hover_select');
    }
}

function emptySelection(event) {
    if (event.target.nodeName === 'TABLE') {
        event.target.classList.remove('hover_select');
    }
}



