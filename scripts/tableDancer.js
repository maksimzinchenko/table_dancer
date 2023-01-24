const tableDancerParams = {
    'selectTable': true
}


window.addEventListener('load', initDancer);

async function initDancer(event) {
    await readOldDancerParamsFromStorage();
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
        startDancer();
    });
}



function startDancer() {
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
    //addTableListeners(tableElement);
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



