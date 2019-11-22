const md5 = require('md5');

function matrixEncode(text){
  const saltMatrix = [
    [19,234,125,62],
    [63,216,21,1],
    [865,12,25,28],
    [99,769,97,24]
  ];
  let arr = [];
  text = text.split("");
  const a = text.length%4;
  for(let i = 0;i<a;i++){text.push(null);}
  for(let i = 0;i<text.length/4;i+=4){
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
}

function multiplyMatrix()

module.exports = function(password){
  const salt = "SoSalty";
  return md5(salt + Buffer.from(password).toString("base64"));
}
// sha3 of md5 salted base64 passcode encoded using a 4x4 matrix...
