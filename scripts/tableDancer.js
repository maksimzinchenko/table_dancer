const tableDancerParams = {
    'selectTable': true
}


window.addEventListener('load', initDancer);

async function initDancer(event) {
    await readOldDancerParamsFromStorage();
    startDancer(event);
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
            tableDancerParams['enableScan'] = result['tableDancerParams']['enableScan'];
            console.log('Table dancer old params were found in storage. Loaded');
        }
    });
}



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

function markTables(tableElement) {
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



