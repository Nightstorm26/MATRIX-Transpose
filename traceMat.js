function traceMatrix() {
    const isSquareMatrix = document.getElementById('matrixSize') !== null;
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
    document.getElementById('traceResult').innerHTML = `The trace of the matrix is: ${trace}`;
}