var columns = [];
var columnCount = 50;
var iterations = 0;
var searchRunning = false;
var delay = 220;

function createColumnValues() {
  columns = [];
  for (var i = 0; i < columnCount; i++) {
    var columnSize = Math.floor(Math.random() * 80) + 1;
    columns.push(columnSize)
  }
}

function loadColumns() {
  clearColumns();
  var columnsWrapper = document.getElementById("columns_wrapper");
  for (var i = 0; i < columns.length; i++) {
    var colDiv;
    var columnSize = columns[i]
    colDiv = document.createElement("div");
    colDiv.className = "column";
    colDiv.setAttribute("id", "col"+i);
    colDiv.style.height = (columnSize * 5)+"px";
    columnsWrapper.append(colDiv);
  }
}

function clearColumns() {
  var columnsWrapper = document.getElementById("columns_wrapper");
  while (columnsWrapper.firstChild) {
    columnsWrapper.removeChild(columnsWrapper.firstChild);
  }
}

function setNumberOfColumns() {
  stopSort();
  columnCount = document.getElementById("columnRange").value;
  document.getElementById("columnCount").innerHTML = columnCount
  resetColumns();
}

function resetColumns() {
  createColumnValues();
  loadColumns();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSort(type) {
  if(searchRunning) {
    return;
  }
  searchRunning = true;
  if(type == "bubble") {
    document.getElementById("bubble-sort-button").classList.add("hidden")
    document.getElementById("cancel-button").classList.remove("hidden")
    await runBubbleSort(true)
    document.getElementById("bubble-sort-button").classList.remove("hidden")
  }
  document.getElementById("cancel-button").classList.add("hidden")
  searchRunning = false;
}

async function runBubbleSort(newSort = true) {
  if(newSort) {
    iterations = 0;
    document.getElementById("loopIterations").innerHTML = iterations + " loops"
  }
  var hasSwapped = false;
  for (var i = 0; i < columns.length; i++) {
    if(!searchRunning) {
      return;
    }
    if(columns.length != i+1) {
      var nodeA = document.getElementById("col"+i);
      var nodeB = document.getElementById("col"+(i+1));
      if(columns[i] > columns[i+1]) {
        nodeA.style.background = "#bd2525";
        nodeB.style.background = "#bd2525";
        var tempVal = columns[i+1];
        columns[i+1] = columns[i];
        columns[i] = tempVal;
        hasSwapped = true;
      } else {
        nodeA.style.background = "#0077cc";
        nodeB.style.background = "#0077cc";
      }
      await sleep(delay);
      loadColumns();
      nodeA.style.background = "#303030";
      nodeB.style.background = "#303030";
    }
  }
  iterations += 1;
  if(iterations == 1) {
    document.getElementById("loopIterations").innerHTML = iterations + " loop";
  } else {
    document.getElementById("loopIterations").innerHTML = iterations + " loops";
  }
  if(hasSwapped) {
    await runBubbleSort(false);
  }
}

function stopSort() {
  searchRunning = false;
}

function setDelay() {
  delay = document.getElementById("delay").value;
  document.getElementById("delayTime").innerHTML = delay + "ms";
}
