let transformationMatrix = [];
let initialMatrix = [];
let initialMatrix_row = 4;
let initialMatrix_cols = 1;
let transformationMatrix_row = 4;
let transformationMatrix_cols = 4;

let x1 = 0,
  y1 = 150,
  z1 = 150;

let x2 = 150,
  y2 = 150,
  z2 = 150;

let x3 = 150,
  y3 = 0,
  z3 = 150;

let x4 = 0,
  y4 = 0,
  z4 = 150;

let x5 = 0,
  y5 = 150,
  z5 = 0;

let x6 = 150,
  y6 = 150,
  z6 = 0;

let x7= 150,
  y7= 0,
  z7= 0;

let x8 = 0,
  y8 = 0,
  z8 = 0;


function setup() {
  createCanvas(1300, 600, WEBGL);
  angleMode(DEGREES);
}

function rotationCallZ() {
  let theta = 1;
  createTransformationMatrix();
  // x-axis rotation
  transformationMatrix[1][1] = cos(theta);
  transformationMatrix[1][2] = -sin(theta);
  transformationMatrix[2][1] = sin(theta);
  transformationMatrix[2][2] = cos(theta);

  // y-axis rotation
  // transformationMatrix[0][0] = cos(theta);
  // transformationMatrix[0][2] = sin(theta);
  // transformationMatrix[2][0] = -sin(theta);
  // transformationMatrix[2][2] = cos(theta);

  // z-axis rotationCall
  // transformationMatrix[0][0] = cos(theta);
  // transformationMatrix[0][1] = -sin(theta);uj
  // transformationMatrix[1][0] = sin(theta);
  // transformationMatrix[1][1] = cos(theta);

  calculation(x1, y1, z1, 'point1');
  calculation(x2, y2, z2, 'point2');
  calculation(x3, y3, z3, 'point3');
  calculation(x4, y4, z4, 'point4');
  calculation(x5, y5, z5, 'point5');
  calculation(x6, y6, z6, 'point6');
  calculation(x7, y7, z7, 'point7');
  calculation(x8, y8, z8, 'point8');


}


function draw() {
  background(255, 83, 13);

  fill(232, 44, 12);
  stroke(255);
  rotationCallZ();

  rotateZ(millis()/1000);
  // rotateY(millis()/1000);

  beginShape();

  vertex(x1, y1, z1);
  vertex(x2, y2, z2);
  vertex(x3, y3, z3);
  vertex(x4, y4, z4);

  endShape(CLOSE);

  beginShape();

  vertex(x5, y5, z5);
  vertex(x6, y6, z6);
  vertex(x7, y7, z7);
  vertex(x8, y8, z8);

  endShape(CLOSE);

  beginShape();

  vertex(x1, y1, z1);
  vertex(x5, y5, z5);
  vertex(x6, y6, z6);
  vertex(x2, y2, z2);

  endShape(CLOSE);

  beginShape();

  vertex(x4, y4, z4);
  vertex(x8, y8, z8);
  vertex(x7, y7, z7);
  vertex(x3, y3, z3);

  endShape(CLOSE);

  beginShape();

  vertex(x2, y2, z2);
  vertex(x6, y6, z6);
  vertex(x7, y7, z7);
  vertex(x3, y3, z3);

  endShape(CLOSE);  

  beginShape();

  vertex(x1, y1, z1);
  vertex(x5, y5, z5);
  vertex(x8, y8, z8);
  vertex(x4, y4, z4);

  endShape(CLOSE);
}

function calculation(x, y, z, pointIdentifier) {

  for (j = 0; j < initialMatrix_row; j++) {
    initialMatrix[j] = [];
    for (i = 0; i < initialMatrix_cols; i++) {
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

  for (j = 0; j < transformationMatrix_row; j++) {
    let temp1 = temp2 = temp3 = 0;
    for (i = 0; i < transformationMatrix_cols; i++) {
      if (j === 0) {
        temp1 = temp1 + (transformationMatrix[j][i] * initialMatrix[i][0]);
      } else if (j === 1) {
        temp2 = temp2 + (transformationMatrix[j][i] * initialMatrix[i][0]);
      } else {
        temp3 = temp3 + (transformationMatrix[j][i] * initialMatrix[i][0]);
      }
    }


    if (pointIdentifier === 'point1') {
      if (j === 0) {
        x1 = temp1;
      } else if (j === 1) {
        y1 = temp2;
      } else if (j === 2) {
        z1 = temp3;
      }
    } else if (pointIdentifier === 'point2') {
      if (j === 0) {
        x2 = temp1;
      } else if (j === 1) {
        y2 = temp2;
      } else if (j === 2) {
        z2 = temp3;
      }
    } else if (pointIdentifier === 'point3') {
      if (j === 0) {
        x3 = temp1;
      } else if (j === 1) {
        y3 = temp2;
      } else if (j === 2) {
        z3 = temp3;
      }
    } else if (pointIdentifier === 'point4') {
      if (j === 0) {
        x4 = temp1;
      } else if (j === 1) {
        y4 = temp2;
      } else if (j === 2) {
        z4 = temp3;
      }
    } else if (pointIdentifier === 'point5') {
      if (j === 0) {
        x5 = temp1;
      } else if (j === 1) {
        y5 = temp2;
      } else if (j === 2) {
        z5 = temp3;
      }
    } else if (pointIdentifier === 'point6') {
      if (j === 0) {
        x6 = temp1;
      } else if (j === 1) {
        y6 = temp2;
      } else if (j === 2) {
        z6 = temp3;
      }
    } else if (pointIdentifier === 'point7') {
      if (j === 0) {
        x7 = temp1;
      } else if (j === 1) {
        y7 = temp2;
      } else if (j === 2) {
        z7 = temp3;
      }
    } else if (pointIdentifier === 'point8') {
      if (j === 0) {
        x8 = temp1;
      } else if (j === 1) {
        y8 = temp2;
      } else if (j === 2) {
        z8 = temp3;
      }
    }
  }
}

function createTransformationMatrix() {
  for (j = 0; j < transformationMatrix_row; j++) {
    transformationMatrix[j] = [];
    for (i = 0; i < transformationMatrix_cols; i++) {
      if (i === j) {
        transformationMatrix[j][i] = 1;
      } else {
        transformationMatrix[j][i] = 0;
      }
    }
  }
}