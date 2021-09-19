scrapeButton = document.querySelector(".scrape-button");

scrapeResultDiv = document.querySelector(".scrape-result");

getSectors = document.querySelector(".get-sectors");
showSectors = document.querySelector(".show-sectors");

scrapeButton.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "Get Stocks of Sector" },
      function (response) {
        console.log(response);
        console.log("eh");
      }
    );
  });
};

chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
  currTab = tab[0];
  tabURL = currTab.url;
  url = new URL(tabURL);
  tabURLHost = url.host;
  console.log(url.host);

  if (tabURLHost == "investingmalaysia.com") {
    getSectors.style.display = "unset";
    showSectors.style.display = "none";
  } else if (tabURLHost == "www.tradingview.com") {
    getSectors.style.display = "none";
    // showSectors.style.display = "unset";
  }
});

//For at Investing Malaysia
//Check if sector is already processed in database

//sectorTitle to be passed from content scripts onload, to be implemented
/* chrome.storage.sync.get(sectorTitle, (item) => {
      if(item){

      }
  })
 */

efsDiv = document.querySelector(".editor-font-size");
currFontSize = document.querySelector(".current-font-size");
efsInput = document.querySelector(".editor-font-size input");
incByOne = Array.from(
  document.querySelectorAll(".editor-font-size .actions .action")
)[0];
decByOne = Array.from(
  document.querySelectorAll(".editor-font-size .actions .action")
)[1];
resToDef = Array.from(
  document.querySelectorAll(".editor-font-size .actions .action")
)[2];

let showFontSize = () => {
  chrome.storage.sync.get("EditorFontSize", (res) => {
    efsstored = res.EditorFontSize;
    currFontSize.innerText = efsstored;
  });
};

showFontSize();

/* efsDiv.addEventListener("click", (e) => {
  if (e.target == incByOne) {
    increaseFontSize();
  } else if (e.target == decByOne) {
    decreaseFontSize();
  } else if (e.target == resToDef){
    resetFontSize();
  }
}); */

let increaseFontSize = () => {
  chrome.storage.sync.get("EditorFontSize", (res) => {
    efsstored = parseInt(res.EditorFontSize);
    newFSObj = { EditorFontSize: (efsstored + 1).toString() };
    chrome.storage.sync.set(newFSObj, () => {
      showFontSize();
    });
  });
}

let decreaseFontSize = () => {
  chrome.storage.sync.get("EditorFontSize", (res) => {
    efsstored = parseInt(res.EditorFontSize);
    newFSObj = { EditorFontSize: (efsstored -1).toString() };
    chrome.storage.sync.set(newFSObj, () => {
      showFontSize();
    });
  });
}

let resetFontSize = () => {
  newFSObj = { EditorFontSize: '13'}
    chrome.storage.sync.set(newFSObj, () => {
      showFontSize();
    });
}