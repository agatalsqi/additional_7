module.exports = function solveSudoku(matrix) {

function hasOnlyColor(array) {
  if (array.length == 1) {
    return true;
  } 
  else {
    return false;
  } 
}

var v = 0;
var possibleColors = [];

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    if (matrix[i][j]) {
      possibleColors[v] = [];
      possibleColors[v][0] = matrix[i][j];
    }
    else {
      possibleColors[v] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    v++;
  }
}

var horizontalCliques = [];
for (var i = 0, j = 0; i < 81; i++) {
  if (!horizontalCliques[j]) horizontalCliques[j] = [];
  horizontalCliques[j].push(i);
  if (!((i+1)%9)) {
    j++;
  }
}

var verticalCliques = [];
for (var i = 0, j = 0; i < 81; i++) {
  if (!verticalCliques[j]) verticalCliques[j] = [];
  verticalCliques[j].push(i);
  if (!((i+1)%9)) { 
    j = 0;
  }
  else {
    j++;
  }
}

var squareCliques = [];
var i = 0, j = 0;
while (i < 81) {
  if (!squareCliques[j]) squareCliques[j] = [];
  squareCliques[j].push(i);
  if (!((i+1)%3)) {
    j++;
  }
  if (!((i+1)%9) && (i+1)%27) {
    j -= 3;
  }
  i++;
}

for (var v = 0; v < 81; v++) {
  if (hasOnlyColor(possibleColors[v])) {
    for (var i = 0; i < 9; i++) {
      if (horizontalCliques[i].indexOf(v)+1) {
        for (var j = 0; j < 9; j++) {
          if ((possibleColors[horizontalCliques[i][j]].length > 1) && (possibleColors[horizontalCliques[i][j]].indexOf(possibleColors[v][0])+1)) {
            possibleColors[horizontalCliques[i][j]].splice(possibleColors[horizontalCliques[i][j]].indexOf(possibleColors[v][0]),1);
          }
        }
      }
      if (verticalCliques[i].indexOf(v)+1) {
        for (var j = 0; j < 9; j++) {
          if ((possibleColors[verticalCliques[i][j]].length > 1) && (possibleColors[verticalCliques[i][j]].indexOf(possibleColors[v][0])+1)) {
            possibleColors[verticalCliques[i][j]].splice(possibleColors[verticalCliques[i][j]].indexOf(possibleColors[v][0]),1);
          }
        }
      }
      if (squareCliques[i].indexOf(v)+1) {
        for (var j = 0; j < 9; j++) {
          if ((possibleColors[squareCliques[i][j]].length > 1) && (possibleColors[squareCliques[i][j]].indexOf(possibleColors[v][0])+1)) {
            possibleColors[squareCliques[i][j]].splice(possibleColors[squareCliques[i][j]].indexOf(possibleColors[v][0]),1);
          }
        }
      }
    }
  }
}

for (var v = 0, temp = [], notCapable = false; v < 81; v++) {
  if (!hasOnlyColor(possibleColors[v])) {
    for (var i = 0; i < 9; i++) {
      if (horizontalCliques[i].indexOf(v)+1) {
        for (var j = 0; j < 9; j++) {
          if ((possibleColors[horizontalCliques[i][j]] == possibleColors[v]) && (v != horizontalCliques[i][j])) {
            
            notCapable = true;
          }

        }
      }
    }
  }  
}

for (var i = 0, v = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    matrix[i][j] = possibleColors[v][0];
    v++;
  }
}


// console.log(matrix);
return matrix;

/*
var possibleColors = [];



  if (!allClear()) {

  }

  function allClear() {
    for (var i = 0; i < 81; i++) {
      if (possibleColors[i].length > 1) {
        return false;
      }
    }
    return true;
  }

  // console.log(possibleColors[12]);*/
}