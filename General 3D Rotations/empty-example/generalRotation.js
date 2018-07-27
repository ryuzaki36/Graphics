// Point Definition for Axis
let x1 = 2,
  y1 = 1,
  z1 = 0;
let x2 = 3,
  y2 = 3,
  z2 = 1;
let delx = x2 - x1;
let dely = y2 - y1;
let delz = z2 - z1;
let a, b, c;

let translationMatrix = [];
let translationMatrixInv = [];

let rotationXMatrix = [];
let rotationXMatrixInv = [];

let rotationYMatrix = [];
let rotationYMatrixInv = [];

let rotationMatrix = [];
let theta = 90;

let initialMatrix = [];

let transformationMatrix1 = [];
let transformationMatrix2 = [];
let transformationMatrix3 = [];
let transformationMatrix4 = [];
let transformationMatrix5 = [];
let transformationMatrix6 = [];
let transformationMatrix = [];

let p = 0,
  q = 250,
  r = 10;
let s = 100,
  t = 0,
  u = 10;

function setup() {
  createCanvas(1200, 600, WEBGL);
  angleMode(DEGREES);
  let moduloV = sqrt((sq(delx) + sq(dely) + sq(delz)));
  a = (delx) / moduloV;
  b = (dely) / moduloV;
  c = (delz) / moduloV;
  d = sqrt(sq(b) + sq(c));
  makeTransformationMatrix();
  // makeInitialMatrix();
  //create transformation matrix;
  translationCall(x1, y1, z1);
  translationCallInv(x1, y1, z1);

  rotationXCall();
  rotationXCallInv();

  rotationYCall();
  rotationYCallInv();

  rotationCall();

  multiplier();


}

function draw() {
  background(255, 83, 13);
  fill(255);
  stroke(255);
  beginShape();
  vertex(p, q, r);
  vertex(s, t, u);
  endShape();




}

function generalRotation() {
  calculation(p, q, r, 'point1');
  calculation(s, t, u, 'point2');
}

function calculation(x, y, z, point) {

  for (j = 0; j < 4; j++) {
    initialMatrix[j] = [];
    for (i = 0; i < 1; i++) {
      if (j === 0) {
        initialMatrix[j][i] = x;
      } else if (j === 1) {
        initialMatrix[j][i] = y;
      } else if (j === 2) {
        initialMatrix[j][i] = z;
      } else {
        initialMatrix[j][i] = 1;
      }
    }
  }

  for (j = 0; j < 4; j++) {
    let temp1 = temp2 = temp3 = 0;
    for (i = 0; i < 4; i++) {
      if (j === 0) {
        temp1 = temp1 + (transformationMatrix6[j][i] * initialMatrix[i][0]);
      } else if (j === 1) {
        temp2 = temp2 + (transformationMatrix6[j][i] * initialMatrix[j][0]);
      } else {
        temp3 = temp3 + (transformationMatrix6[j][i] * initialMatrix[j][0]);
      }
    }

    if (point === 'point1') {
      if (j === 0) {
        p = temp1;
      } else if (j === 1) {
        q = temp2;
      } else if (j === 2) {
        r = temp3;
      }
    }
    if (point === 'point2') {
      if (j === 0) {
        s = temp1;
      } else if (j === 1) {
        t = temp2;
      } else if (j === 2) {
        u = temp3;
      }
    }
  }

}

function multiplier() {
  for (let j = 0; j < 4; j++) {
    for (let k = 0; k < 4; k++) {
      for (let i = 0; i < 4; i++) {
        transformationMatrix1[j][k] += translationMatrixInv[j][i] * rotationXMatrixInv[i][k];
      }
    }
  }

  // console.log(transformationMatrix);

  for (let j = 0; j < 4; j++) {
    for (let k = 0; k < 4; k++) {
      for (let i = 0; i < 4; i++) {
        transformationMatrix2[j][k] += transformationMatrix1[j][i] * rotationYMatrixInv[i][k];
      }
    }

  }

  for (j = 0; j < 4; j++) {
    for (k = 0; k < 4; k++) {
      for (i = 0; i < 4; i++) {
        transformationMatrix3[j][k] += transformationMatrix2[j][i] * rotationMatrix[i][k];
      }
    }
  }

  for (j = 0; j < 4; j++) {
    for (k = 0; k < 4; k++) {
      for (i = 0; i < 4; i++) {
        transformationMatrix4[j][k] += transformationMatrix3[j][i] * rotationYMatrix[i][k];
      }
    }
  }

  for (j = 0; j < 4; j++) {
    for (k = 0; k < 4; k++) {
      for (i = 0; i < 4; i++) {
        transformationMatrix5[j][k] += transformationMatrix4[j][i] * rotationXMatrix[i][k];
      }
    }
  }
  for (j = 0; j < 4; j++) {
    for (k = 0; k < 4; k++) {
      for (i = 0; i < 4; i++) {
        transformationMatrix6[j][k] += transformationMatrix5[j][i] * translationMatrix[i][k];
      }
    }
  }


}

function translationCall(x, y, z) {
  for (j = 0; j < 4; j++) {
    translationMatrix[j] = [];
    for (i = 0; i < 4; i++) {
      if (i === j) {
        translationMatrix[j][i] = 1;
      } else if (j === 0 && i === 3) {
        translationMatrix[j][i] = -x;
      } else if (j === 1 && i === 3) {
        translationMatrix[j][i] = -y;
      } else if (j === 2 && i === 3) {
        translationMatrix[j][i] = -z;
      } else {
        translationMatrix[j][i] = 0;
      }
    }
  }
}

function translationCallInv(x, y, z) {
  for (j = 0; j < 4; j++) {
    translationMatrixInv[j] = [];
    for (i = 0; i < 4; i++) {
      if (i === j) {
        translationMatrixInv[j][i] = 1;
      } else if (j === 0 && i === 3) {
        translationMatrixInv[j][i] = x;
      } else if (j === 1 && i === 3) {
        translationMatrixInv[j][i] = y;
      } else if (j === 2 && i === 3) {
        translationMatrixInv[j][i] = z;
      } else {
        translationMatrixInv[j][i] = 0;
      }
    }
  }
}

function rotationXCall() {
  for (j = 0; j < 4; j++) {
    rotationXMatrix[j] = [];
    for (i = 0; i < 4; i++) {
      if (j === 1 && i === 1) {
        rotationXMatrix[j][i] = (c / d);
      } else if (j === 1 && i === 1) {
        rotationXMatrix[j][i] = 100;
      } else if (j === 1 && i === 2) {
        rotationXMatrix[j][i] = -(b / d);
      } else if (j === 2 && i === 1) {
        rotationXMatrix[j][i] = (b / d);
      } else if (j === 2 && i === 2) {
        rotationXMatrix[j][i] = (c / d);
      } else if (j === 3 && i === 3) {
        rotationXMatrix[j][i] = 1;
      } else if (j === 0 && i === 0) {
        rotationXMatrix[j][i] = 1;
      } else {
        rotationXMatrix[j][i] = 0;
      }
    }
  }
}

function rotationXCallInv() {
  for (j = 0; j < 4; j++) {
    rotationXMatrixInv[j] = [];
    for (i = 0; i < 4; i++) {
      if (j === 1 && i === 1) {
        rotationXMatrixInv[j][i] = (c / d);
      } else if (j === 1 && i === 1) {
        rotationXMatrixInv[j][i] = 100;
      } else if (j === 1 && i === 2) {
        rotationXMatrixInv[j][i] = (b / d);
      } else if (j === 2 && i === 1) {
        rotationXMatrixInv[j][i] = -(b / d);
      } else if (j === 2 && i === 2) {
        rotationXMatrixInv[j][i] = (c / d);
      } else if (j === 3 && i === 3) {
        rotationXMatrixInv[j][i] = 1;
      } else if (j === 0 && i === 0) {
        rotationXMatrixInv[j][i] = 1;
      } else {
        rotationXMatrixInv[j][i] = 0;
      }
    }
  }
}

function rotationYCall() {
  for (j = 0; j < 4; j++) {
    rotationYMatrix[j] = [];
    for (i = 0; i < 4; i++) {
      if (j === 0 && i === 0) {
        rotationYMatrix[j][i] = d;
      } else if (j === 0 && i === 2) {
        rotationYMatrix[j][i] = -(a);
      } else if (j === 2 && i === 0) {
        rotationYMatrix[j][i] = (a);
      } else if (j === 2 && i === 2) {
        rotationYMatrix[j][i] = (d);
      } else if (i === 1 && j === 1) {
        rotationYMatrix[j][i] = 1;
      } else if (i === 3 && j === 3) {
        rotationYMatrix[j][i] = 1;
      } else {
        rotationYMatrix[j][i] = 0;
      }
    }
  }
}

function rotationYCallInv() {
  for (j = 0; j < 4; j++) {
    rotationYMatrixInv[j] = [];
    for (i = 0; i < 4; i++) {
      if (j === 0 && i === 0) {
        rotationYMatrixInv[j][i] = d;
      } else if (j === 0 && i === 2) {
        rotationYMatrixInv[j][i] = (a);
      } else if (j === 2 && i === 0) {
        rotationYMatrixInv[j][i] = -(a);
      } else if (j === 2 && i === 2) {
        rotationYMatrixInv[j][i] = (d);
      } else if (i === 1 && j === 1) {
        rotationYMatrixInv[j][i] = 1;
      } else if (i === 3 && j === 3) {
        rotationYMatrixInv[j][i] = 1;
      } else {
        rotationYMatrixInv[j][i] = 0;
      }
    }
  }
}

function rotationCall() {
  for (j = 0; j < 4; j++) {
    rotationMatrix[j] = [];
    for (i = 0; i < 4; i++) {
      if (j === 0 && i === 0) {
        rotationMatrix[j][i] = cos(theta);
      } else if (j === 0 && i === 1) {
        rotationMatrix[j][i] = -(sin(theta));
      } else if (j === 1 && i === 0) {
        rotationMatrix[j][i] = sin(theta);
      } else if (j === 1 && i === 1) {
        rotationMatrix[j][i] = cos(theta);
      } else if (i === 2 && j === 2) {
        rotationMatrix[j][i] = 1;
      } else if (i === 3 && j === 3) {
        rotationMatrix[j][i] = 1;
      } else {
        rotationMatrix[j][i] = 0;
      }
    }
  }
}

function makeTransformationMatrix() {
  for (j = 0; j < 4; j++) {
    transformationMatrix1[j] = [];
    transformationMatrix2[j] = [];
    transformationMatrix3[j] = [];
    transformationMatrix4[j] = [];
    transformationMatrix5[j] = [];
    transformationMatrix6[j] = [];
    transformationMatrix[j] = [];


    for (i = 0; i < 4; i++) {
      transformationMatrix1[j][i] = 0;
      transformationMatrix2[j][i] = 0;
      transformationMatrix3[j][i] = 0;
      transformationMatrix4[j][i] = 0;
      transformationMatrix5[j][i] = 0;
      transformationMatrix6[j][i] = 0;
      transformationMatrix[j][i] = 0;

    }
  }
}