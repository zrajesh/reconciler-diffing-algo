// DOM Reconciler and Diffing algorithm / library

function createDomElements(data) {
    var parentElement = document.getElementById("main");
  
    // Get the current children of the parent element and convert it to an array
    var currentChildren = Array.from(parentElement.children);
    var diff = []; // Diffing array to track changes
  
    // Process each item in the data array
    data.forEach(function(item) {
      // Check if a child with this ID already exists
      var existingChild = currentChildren.find(function(child) {
        return child.dataset.id === String(item.id);
      });
  
      if (existingChild) {
        // If it exists, update it
        existingChild.children[0].innerHTML = item.title;
        existingChild.children[1].innerHTML = item.description;
        // Remove it from the currentChildren array
        currentChildren = currentChildren.filter(function(child) {
          return child !== existingChild;
        });
      } else {
        // If it doesn't exist, add it to the diffing array
        diff.push({
          type: "create",
          item: item
        });
      }
    });
  
    // Any children left in the currentChildren array no longer exist in the data, so add them to the diffing array for removal
    currentChildren.forEach(function(child) {
      diff.push({
        type: "remove",
        element: child
      });
    });
  
    // Apply the changes from the diffing array
    diff.forEach(function(change) {
      if (change.type === "create") {
        var item = change.item;
        var childElement = document.createElement("div");
        childElement.dataset.id = item.id;
  
        var grandChildElement1 = document.createElement("span");
        grandChildElement1.innerHTML = item.title;
  
        var grandChildElement2 = document.createElement("span");
        grandChildElement2.innerHTML = item.description;
  
        var grandChildElement3 = document.createElement("button");
        grandChildElement3.innerHTML = "Delete";
        grandChildElement3.setAttribute("onclick", "deleteTodo(" + item.id + ")");
  
        childElement.appendChild(grandChildElement1);
        childElement.appendChild(grandChildElement2);
        childElement.appendChild(grandChildElement3);
        parentElement.appendChild(childElement);
      } else if (change.type === "remove") {
        var element = change.element;
        parentElement.removeChild(element);
      }
    });
}
  
