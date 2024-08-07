import { transposeMatrix } from './transposeMat.js';
import { invertMatrix, calculateDeterminant } from './invertMat.js';
export function performAllOperations() {
    transposeMatrix();
    invertMatrix();
    calculateDeterminant();
    traceMatrix();
}
export function traceMatrix() {
    const isSquareMatrix = window.location.href.includes('square.html');
    let numRows, numCols;
    
    if (isSquareMatrix) {
        numRows = numCols = parseInt(document.getElementById('matrixSize').value);
    } else {
        numRows = parseInt(document.getElementById('numRows').value);
        numCols = parseInt(document.getElementById('numCols').value);
    }

    if (numRows !== numCols) {
        document.getElementById('traceResult').innerHTML = "Trace is only defined for square matrices.";
        return;
    }

    let trace = 0;

    // Calculate the trace
    for (let i = 0; i < numRows; i++) {
        const cell = document.getElementById(`cell-${i}-${i}`);
        trace += Number(cell.value);
    }

    // Display the result
    let resultHTML="<h3>Trace of the Matrix:</h3>";
    resultHTML += `The trace of the matrix is: ${trace}`;
    resultHTML += "<br>";

    document.getElementById('traceResult').innerHTML =resultHTML ;
}

