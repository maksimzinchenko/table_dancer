let selectTable = document.getElementById("selectTable");

const tableDancerParams = {
    'selectTable': true
}

window.addEventListener('load', initParams);

selectTable.addEventListener("change", changeDispatcher);

function sendMessage(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { command: "updateView" },
          function (response) {}
        );
      });
}

async function saveTableDancerParamsObject() {
    await chrome.storage.local.set(
        {
            tableDancerParams: tableDancerParams
        },
        function () {
            console.log('New params value were written.. ');
        }
    );
    sendMessage();
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