window.onload = () => {
  renderSectors();
  renderPriorities();
  renderExcludes();
  buttonActions();
  priorityButtonActions();

  let lastClicked = null;

  window.addEventListener("click", (e) => {
    pexc = document.querySelector("body > div.priorities");
    if (pexc.contains(e.target)) {
      return;
    }

    let t = e.target;
    console.log(e);

    let unselectAll = () => {
      as = Array.from(document.querySelectorAll("ul li.selected"));
      console.log(as);

      as.forEach((li) => {
        li.classList.remove("selected");
      });
    };

    if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
      if (t.tagName == "LI") {
        if (t.classList.contains("selected")) {
          console.log("remove 1");
          t.classList.remove("selected");
        } else {
          console.log("add 1");
          unselectAll();
          t.classList.add("selected");
        }

        lastClicked = t;
        console.log(lastClicked);
      } else if (t.parentNode.tagName == "LI") {
        if (t.parentNode.classList.contains("selected")) {
          console.log("remove 2");
          t.parentNode.classList.remove("selected");
        } else {
          console.log("add 2");
          unselectAll();
          t.parentNode.classList.add("selected");
        }

        lastClicked = t.parentNode;
        console.log(lastClicked);
      }
    } else if (e.ctrlKey || e.metaKey) {
      if (t.tagName == "LI") {
        if (t.classList.contains("selected")) {
          console.log("remove 1");
          t.classList.remove("selected");
        } else {
          console.log("add 1");

          t.classList.add("selected");
        }

        lastClicked = t;
        console.log(lastClicked);
      } else if (t.parentNode.tagName == "LI") {
        if (t.parentNode.classList.contains("selected")) {
          console.log("remove 2");
          t.parentNode.classList.remove("selected");
        } else {
          console.log("add 2");

          t.parentNode.classList.add("selected");
        }

        lastClicked = t.parentNode;
        console.log(lastClicked);
      }
    } else if (e.shiftKey) {
      if (!lastClicked) {
        if (t.tagName == "LI") {
          t.classList.add("selected");
          lastClicked = t;
        } else if (t.parentNode.tagName == "LI") {
          t.parentNode.classList.add("selected");
          lastClicked = t.parentNode;
        }
      } else if (lastClicked) {
        isLastClickedSelected = lastClicked.classList.contains("selected");
        if (t.tagName == "LI") {
          clickedTarget = t;
        } else if (t.parentNode.tagName == "LI") {
          clickedTarget = t.parentNode;
        }

        allLi = Array.from(document.querySelectorAll("ul li"));
        indexOfLastClicked = allLi.indexOf(lastClicked);
        indexOfClickedTarget = allLi.indexOf(clickedTarget);

        if (indexOfLastClicked < indexOfClickedTarget) {
          for (i = indexOfLastClicked; i <= indexOfClickedTarget; i++) {
            !isLastClickedSelected
              ? allLi[i].classList.remove("selected")
              : allLi[i].classList.add("selected");
          }
        } else if (indexOfClickedTarget < indexOfLastClicked) {
          for (i = indexOfClickedTarget; i <= indexOfLastClicked; i++) {
            isLastClickedSelected
              ? allLi[i].classList.remove("selected")
              : allLi[i].classList.add("selected");
          }
        }
      }
    }
  });
};


chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log(changes, namespace)
  if(Object.keys(changes).includes('Priority')){
    renderPriorities();
  }else if(Object.keys(changes).includes('Excludes')){
    renderExcludes();
  }else{
    renderSectors();
  }
  
  
  
  // buttonActions();
  // priorityButtonActions();
});