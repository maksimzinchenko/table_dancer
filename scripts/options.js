let selectTable = document.getElementById("selectTable");

const tableDancerParams = {
    'selectTable': true
}

window.addEventListener('load', initParams);

selectTable.addEventListener("change", changeDispatcher);

function saveTableDancerParamsObject() {
    chrome.storage.local.set(
        {
            tableDancerParams: tableDancerParams
        },
        function () {
            console.log('New params value were written.. ');
        }
    );
}

function changeDispatcher(event){
    if (event.target.id !== 'selectTable'){
        // some text values dispatches
    } else {
        tableDancerParams[event.target.id] = selectTable.checked;
    }
    saveTableDancerParamsObject();
}


function initParams(event){
    chrome.storage.local.get("tableDancerParams", (result) => {
        if ('tableDancerParams' in result) {
            if (result['tableDancerParams']['selectTable']){
                tableDancerParams['selectTable'] = selectTable.checked = true;
            } else {
                tableDancerParams['selectTable'] = selectTable.checked = false;
            };
        }
    });
}