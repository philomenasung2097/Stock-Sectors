let buttonActions = () => {
  deleteSectors = document.querySelector(".delete-sectors");
  addToPriority = document.querySelector(".add-to-priority");

  deleteSectors.onclick = () => {
    allSelectedItems = document.querySelectorAll(".selected");

    itemsToDelete = [];
    allSelectedItems.forEach((item) => {
      itemToDelete = item.innerText;
      itemsToDelete.push(itemToDelete);
    });
    console.log(itemsToDelete);
    chrome.storage.sync.remove(itemsToDelete, (result) => {
      renderSectors();
    });
  };

  addToPriority.onclick = () => {
    allSelectedItems = document.querySelectorAll(".selected");

    itemsToPrioritize = [];
    allSelectedItems.forEach((item) => {
      item = item.innerText;
      itemsToPrioritize.push(item);
    });

    chrome.storage.sync.get("Priority", (priorityObj) => {
      if (Object.keys(priorityObj).length == 0) {
        newPriorityObj = { Priority: itemsToPrioritize };
        chrome.storage.sync.set(newPriorityObj, () => {
          renderPriorities();
        });
      } else {
        storedPArray = priorityObj.Priority;
        newArray = storedPArray.concat(itemsToPrioritize);
        newArray = [...new Set(newArray)];
        newPriorityObj = { Priority: newArray };
        chrome.storage.sync.set(newPriorityObj, () => {
          renderPriorities();
        });
      }
      /* npa = priorityObj.concat(itemsToPrioritize);
        newPriorityObj = {'Priority': npa}
        chrome.storage.sync.set(newPriorityObj, (result)=> {
            console.log(result)
        }); */
    });
  };
};

let priorityButtonActions = () => {
  priorityDiv = document.querySelector(".priorities");

  priorityDiv.addEventListener("click", (e) => {
    if (e.target.tagName != "IMG") return;

priorityText = e.target.parentNode.parentNode.firstChild.innerText
console.log(priorityText)

    chrome.storage.sync.get("Priority", (p) => {
      storedPriorities = p.Priority;

      indexOfP = storedPriorities.indexOf(priorityText);

      

      if (e.target.className == "move-up") {
          console.log(storedPriorities)
          console.log(indexOfP, indexOfP - 1)
        arraymove(storedPriorities, indexOfP, indexOfP - 1);
        console.log(storedPriorities)
        newPriorityObj = {
            'Priority': storedPriorities
        }
        chrome.storage.sync.set(newPriorityObj, () => {
            renderPriorities()
        })
        
      }
      if (e.target.className == "move-down") {
        arraymove(storedPriorities, indexOfP, indexOfP + 1);

        newPriorityObj = {
            'Priority': storedPriorities
        }
        chrome.storage.sync.set(newPriorityObj, () => {
            renderPriorities()
        })
      }
      if (e.target.className == "delete") {
        storedPriorities.splice(indexOfP, 1)

          newPriorityObj = {
            'Priority': storedPriorities
        }
        chrome.storage.sync.set(newPriorityObj, () => {
            renderPriorities()
        })
      }
    });
  });
};

function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}
