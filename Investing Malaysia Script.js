async function fetchSingle(url, pageNum) {
  return new Promise(async function (resolve, reject) {
    let exPageURL =
      "https://investingmalaysia.com/category/bursa-malaysia-sector/bm-consumer-products-services/page/1";

    pageURLToFetch = `${url}`;

    webpage = await fetch(pageURLToFetch);
    webpageHTML = await webpage.text();
    webpageDoc = new DOMParser().parseFromString(webpageHTML, "text/html");

    let allStocks = Array.from(
      webpageDoc.querySelectorAll(".product.col_item h3")
    );

    allStocksArray = [];

    allStocks.forEach((stock) => {
      stockName = stock.innerText;
      start = stockName.indexOf(" ") + 1;
      end = stockName.lastIndexOf(" ");
      stockName = stockName.slice(start, end);
      allStocksArray.push(stockName);
    });

    resolve(allStocksArray);
  });
}

async function fetchAll(tvurl) {
  if (!tvurl) {
    sectorTitle = document.querySelector(".pr25.pl25 h1.mt0").innerText;

    currUrl = window.location.href;
    p = currUrl.indexOf("/page/");
    if (p > 0) {
      baseUrl = currUrl.slice(0, p + 1);
    } else {
      baseUrl = currUrl;
    }

    allPages = Array.from(document.querySelectorAll("li a.page-numbers"));

    if (allPages.length > 0) {
      allPages = allPages.filter((pageLink) => {
        if (
          pageLink.classList.contains("prev") ||
          pageLink.classList.contains("next")
        ) {
          return false;
        } else {
          return true;
        }
      });

      lastPage = parseInt(allPages[allPages.length - 1].innerText);
    } else {
      lastPage = parseInt(0);
    }
  } else if (tvurl) {
    pageToGet = await fetch(tvurl);
    pageToGetHTML = await pageToGet.text();

    domparser = new DOMParser();
    let doc = domparser.parseFromString(pageToGetHTML, "text/html");

    sectorTitle = doc.querySelector(".pr25.pl25 h1.mt0").innerText;

    baseUrl = tvurl;
    allPages = Array.from(doc.querySelectorAll("li a.page-numbers"));

    if (allPages.length > 0) {
      allPages = allPages.filter((pageLink) => {
        if (
          pageLink.classList.contains("prev") ||
          pageLink.classList.contains("next")
        ) {
          return false;
        } else {
          return true;
        }
      });

      lastPage = parseInt(allPages[allPages.length - 1].innerText);
    } else {
      lastPage = parseInt(0);
    }
    console.log(lastPage);
  }

  combinedArray = [];
  // for(i = 1; i < lastPage + 1; i++){
  let i = 1;

  Toastify({
    text: "Adding sector to database",
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    background: "#97ffa9",
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function(){} // Callback after click
  }).showToast();

  let Trigger;

  async function l(i) {
    urlToFetch = `${baseUrl}page/${i}`;
    console.log(urlToFetch);
    let resultArray = await fetchSingle(urlToFetch);
    console.log(resultArray);
    combinedArray.push(resultArray);

    if (i < lastPage + 1) {
      i++;
      l(i);
    } else if (i == lastPage + 1) {
      setTimeout(() => {
        console.log(combinedArray);
        finalArray = [];
        combinedArray.forEach((arr) => {
          finalArray = finalArray.concat(arr);
        });

        finalArray.sort();
        console.log(finalArray);
        objToStore = {};
        objToStore[sectorTitle] = finalArray;

        chrome.storage.sync.set(objToStore, function (response) {
          console.log(response);
          Toastify({
            text: "Successfully added sector to database",
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            background: "#80adff",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function(){} // Callback after click
          }).showToast();
        });
      }, 1000);
    }
  }

  l(i);

  setTimeout(() => {
    /* console.log(combinedArray);
    finalArray = [];
    combinedArray.forEach((arr) => {
      finalArray = finalArray.concat(arr);
    });

    finalArray.sort();
    console.log(finalArray); */
    /* 
  
      allSectors = await function () {
        return new Promise((resolve, reject) => {
          chrome.storage.sync.get("allSectors", (result) => {
            resolve(result);
          });
        });
      };
  
      if(!allSectors){
          chrome.storage.sync.set({'allSectors': [sectorTitle]})
      }else{
          allSectorsArray = allSectors
          allSectorsArray.push(sectorTitle)
          chrome.storage.sync.set({'allSectors': allSectorsArray})
      }*/
    /*  objToStore = {};
    objToStore[sectorTitle] = finalArray;

    chrome.storage.sync.set(objToStore, function () {}); */
  }, 1000);
}

let investingMalaysiaScript = () => {
  fetchAll();
};
