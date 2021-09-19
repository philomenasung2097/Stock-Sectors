async function fetchStockSectors() {
  stockSymbol = document
    .querySelector("#header-toolbar-symbol-search")
    .innerText.toLowerCase();

  b = await fetch(`https://investingmalaysia.com/stock/${stockSymbol}`);
  c = await b.text();
  const parser = new DOMParser();
  let thisStockPage = parser.parseFromString(c, "text/html");

  allSectors = Array.from(thisStockPage.querySelectorAll("span.date_meta a"));

  ecSectorTagsDiv = document.createElement("img");
  ecSectorTagsDiv.className = 'ec'
  ecSectorTagsDiv.src = "https://static.thenounproject.com/png/1241426-200.png";
  ecSectorTagsDiv.style =
    "margin-top: 2px;float: right; margin-right: -7px; width: 24px; height: 24px; cursor: pointer;";

  matchDiv.appendChild(ecSectorTagsDiv);

  sectorTagsDiv = document.createElement("div");
  sectorTagsDiv.className = "sector-tags";
  sectorTagsDiv.style =
    "display: flex; flex-wrap: wrap; margin-top: 10px; position: relative; max-height: 0px; overflow: hidden; transition: all 0.3s ";

  ecSectorTagsDiv.onclick = () => {
    if (sectorTagsDiv.style.maxHeight == "1000px") {
      sectorTagsDiv.style.maxHeight = "0px";
    } else {
      sectorTagsDiv.style.maxHeight = "1000px";
    }
  };

  allSectors.forEach((sSector) => {
    sectorPage = sSector.href;
    sectorName = sSector.innerText;

    sectorTag = document.createElement("div");
    sectorTag.style =
      "margin: 4px 5px; padding: 7px 8px; border-radius: 40px; font-size: 17px; font-family: Times,Times New Roman; background: #f3c1ff; cursor: pointer; font-weight: 700";
    sectorTag.setAttribute("href", sectorPage);
    sectorTag.innerText = sectorName;

    sectorTagsDiv.appendChild(sectorTag);
  });

  matchDiv.appendChild(sectorTagsDiv);
}
