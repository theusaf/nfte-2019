const md5 = require('md5');
const sha512 = require('sha.js').sha512;
const checksum = require('checksum');

function matrixEncode(text){
  const saltMatrix = [
    [19,234,125,62],
    [63,216,21,1],
    [865,12,25,28],
    [99,769,97,24]
  ];
  let arr = [];
  text = text.split("");
  let a = 16 - text.length;
  if(a < 0){
    a = 0;
    text = text.slice(0,16);
  }
  for(let i = 0;i<a;i++){text.push(null);}
  for(let i = 0;i<text.length;i+=4){
    arr.push(text.slice(i,i+4));
  }
  for(let i in arr){
    for(let j in arr[i]){
      if(arr[i][j] == null){
        arr[i][j] = 0;
        continue;
      }
      arr[i][j] = arr[i][j].charCodeAt(0);
    }
  }
  return multiplyMatrix(saltMatrix,arr);
}

function multiplyMatrix(a,b){
  // We assume that the data is correct
  var aNumRows = a.length, aNumCols = a[0].length,
    bNumRows = b.length, bNumCols = b[0].length,
    m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

function atob(t){
  return Buffer.from(t,"base64").toString("ascii");
}
function btoa(t){
  return Buffer.from(t).toString("base64");
}

module.exports = function(password){
  const salt = "BE_PREPARED_FOR_CHANGE";
  const hash = new sha512();
  hash.update(JSON.stringify(matrixEncode(password)) + salt + md5(btoa(password)),"utf8");
  return hash.digest();
}
// SHA3 [ JSON [ MATRIX ENCODE [ PASS ] ] + SALT + MD5 [ BASE64 [ PASS ] ] ]
