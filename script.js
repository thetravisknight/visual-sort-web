var columns = [];
var columnCount = 20;
var iterations = 0;
var searchRunning = false;
var delay = 220;

var redColor = "#bd2525";
var blueColor = "#0077cc";
var greyColor = "#303030";

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
    document.getElementById("sort-button").classList.add("hidden")
    document.getElementById("cancel-button").classList.remove("hidden")
    await runBubbleSort(true)
    document.getElementById("sort-button").classList.remove("hidden")
  } else if(type == "selection") {
    document.getElementById("sort-button").classList.add("hidden")
    document.getElementById("cancel-button").classList.remove("hidden")
    await runSelectionSort(true)
    document.getElementById("sort-button").classList.remove("hidden")
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
        nodeA.style.background = redColor;
        nodeB.style.background = redColor;
        var tempVal = columns[i+1];
        columns[i+1] = columns[i];
        columns[i] = tempVal;
        hasSwapped = true;
      } else {
        nodeA.style.background = blueColor;
        nodeB.style.background = blueColor;
      }
      await sleep(delay);
      loadColumns();
      nodeA.style.background = greyColor;
      nodeB.style.background = greyColor;
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

async function runSelectionSort(newSort = true) {
    if(newSort) {
      iterations = 0;
      document.getElementById("loopIterations").innerHTML = iterations + " loops"
    }
    var len = columns.length;
    for (var i = 0; i < len - 1; i = i + 1) {
        if(!searchRunning) {
          return;
        }
        var j_min = i;
        for (var j = i + 1; j < len; j = j + 1) {
            if (columns[j] < columns[j_min]) {
                j_min = j;
            } else {}
        }
        var nodeA = document.getElementById("col"+i);
        var nodeB = document.getElementById("col"+j_min);
        if (j_min !== i) {
            nodeA.style.background = redColor;
            nodeB.style.background = redColor;
            swapCol(columns, i, j_min);
        } else {
          nodeA.style.background = blueColor;
          nodeB.style.background = blueColor;
        }
        await sleep(delay);
        loadColumns();
        nodeA.style.background = greyColor;
        nodeB.style.background = greyColor;
        iterations += 1;
        if(iterations == 1) {
          document.getElementById("loopIterations").innerHTML = iterations + " loop";
        } else {
          document.getElementById("loopIterations").innerHTML = iterations + " loops";
        }
    }
}

function swapCol(col, x, y) {
    var temp = col[x];
    col[x] = col[y];
    col[y] = temp;
}

function stopSort() {
  searchRunning = false;
}

function setDelay() {
  delay = document.getElementById("delay").value;
  document.getElementById("delayTime").innerHTML = delay + "ms";
}

document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('bubblesort').addEventListener('click',function(){
        runSort('bubble');
    },false);

    document.getElementById('selectionsort').addEventListener('click',function(){
        runSort('selection');
    },false);
},false);
