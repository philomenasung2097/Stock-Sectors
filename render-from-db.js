let renderSectors = () => {
  chrome.storage.sync.get(null, (items) => {
    storedSectors = Object.keys(items);
    console.log(storedSectors);
    sectorsUl = document.querySelector(".all-sectors ul");
    sectorsUl.innerHTML = ''

    setTimeout(() => {
      storedSectors.forEach((sector) => {
        if (sector == "Priority" || sector == "Excludes" || sector == "EditorFontSize") return;

        sDiv = document.createElement("li");
        sDiv.innerHTML = `<p>${sector}</p>`;

        sectorsUl.appendChild(sDiv);
      });
    }, 200);
  });
};

let renderPriorities = () => {
  chrome.storage.sync.get("Priority", (p) => {
    if (Object.keys(p).length == 0) return;

    storedPriorities = p.Priority;
    console.log(storedPriorities);
    prioritiesOl = document.querySelector(".priorities ol");
    while(prioritiesOl.firstChild){
      prioritiesOl.removeChild(prioritiesOl.firstChild)
    }
    
      storedPriorities.forEach((priority) => {
        pDiv = document.createElement("li");
        pDiv.innerHTML = `<p>${priority}</p><div class="actions"><img class="delete" src="Delete.png"/></div>`;

        prioritiesOl.appendChild(pDiv);
      });
    
  });
};


let renderExcludes = () => {
  chrome.storage.sync.get("Excludes", (ex) => {
    if (Object.keys(ex).length == 0) return;

    storedExcludes = ex.Excludes;
    console.log(storedExcludes);
    excludesUl = document.querySelector("ul.excludes-list");
    excludesUl.innerHTML = "";

    storedExcludes.forEach((excludeRule) => {
      let { excludeSector, stockSymbol } = excludeRule;

      eDiv = document.createElement("li");
      eDiv.style = "display: flex; justify-content: space-between";
      eDiv.innerHTML = `<div>${stockSymbol}: ${excludeSector}</div><img src="${chrome.runtime.getURL(
        "Delete.png"
      )}" style="width: 15px; height: 15px"/>`;

      excludesUl.appendChild(eDiv);
    });
    

    

    let excludesUlClick = (e) => {
      console.log('ae')
      if(e.target.tagName == 'IMG'){
        excludeToRemove = e.target.parentNode.firstChild.innerText
        excludeToRemove = excludeToRemove.slice(excludeToRemove.indexOf(':') + 2)
          console.log(excludeToRemove)
        chrome.storage.sync.get('Excludes', (result) => {
          excludeArr = result.Excludes
          console.log(excludeArr)
          excludeArr = excludeArr.filter(exclude => exclude.excludeSector != excludeToRemove)
          console.log(excludeArr)
          newExcArrObj = {
            'Excludes': excludeArr
          }
          chrome.storage.sync.set(newExcArrObj, () => {
            renderExcludes()
          })
        })
      }
    }

    excludesUl.addEventListener('click', excludesUlClick)
  });
};


pa = document.querySelector('#priority-arrange')
new Sortable(pa, {
  animation: 150,
  // ghostClass: 'blue-background-class'
});

pa.addEventListener('dragend', () => {
 let  allPriorities = Array.from(pa.children)
 let newPrioritiesArr = []
allPriorities.forEach(p => newPrioritiesArr.push(p.innerText))
let newPrioritiesObj = {
  Priority: newPrioritiesArr
}

chrome.storage.sync.set(newPrioritiesObj, () => {
  console.log('Priorities updated')
})

})