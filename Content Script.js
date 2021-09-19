window.onload = async () => {
  thisURL = new URL(window.location.href);
  console.log(thisURL);
  if (thisURL.hostname == "investingmalaysia.com") {
  } else if (thisURL.hostname == "www.tradingview.com") {
    addToastifyToWebsite();

    tradingViewScript();
    addTVKeyListener();

    setTimeout(() => {
      let stockSymbol = document.querySelector(
        "#header-toolbar-symbol-search"
      )

      if (!stockSymbol) {
        return;
      }else{
        stockSymbol = stockSymbol.innerText;
      }

      console.log(stockSymbol);
      setInterval(() => {
        let nss = document.querySelector(
          "#header-toolbar-symbol-search"
        )
        if(!nss) { return}
        let newStockSymbol = nss.innerText;
        /* console.log(stockSymbol);
        console.log(newStockSymbol); */
        if (stockSymbol == newStockSymbol) {
          // console.log('same')
        } else {
          // console.log('change')
          tradingViewScript();
        }
        setTimeout(() => {
          stockSymbol = newStockSymbol;
        }, 300);
      }, 500);
    }, 1500);

    chrome.storage.onChanged.addListener(function (changes, namespace) {
      if (Object.keys(changes).includes("EditorFontSize")) {
        editor = document.querySelector("#editor");
        if(editor){
          chrome.storage.sync.get("EditorFontSize", (res) => {
            editorFontSize = res.EditorFontSize;
            console.log(res);
            
            if (editorFontSize) {
              console.log(editorFontSize);
              editor.style.fontSize = editorFontSize.toString() + "px";
            }
          });
        }
        

        return;
      }

      tradingViewScript();
    });

    /* let targetNode = document.querySelector("#header-toolbar-symbol-search");
    const config = {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
      characterDataOldValue: true,
    };

    const callback = function (mutationsList, observer) {
      console.log(targetNode.innerText);
      tradingViewScript();
    };
    console.log(targetNode);
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config); */
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.sectorName) {
    let url = window.location.href;

    let sectorTitle = document.querySelector(".pr25.pl25 h1.mt0").innerText;

    if (sectorTitle && url.indexOf("category")) {
      sendResponse("is a sector page");
    }
  } else if (request.sectorNameDB) {
    let { sectorNameDB } = request;
    chrome.storage.sync.get(sectorName, (item) => {
      if (item) {
        sendResponse("sector exists in database");
      } else {
        sendResponse("sector not found in database");
      }
    });
  } else if (request.action) {
    if (request.action == "Get Stocks of Sector") {
      fetchAll();
      sendResponse({ message: "Get Successfully" });
    }
  }
});
