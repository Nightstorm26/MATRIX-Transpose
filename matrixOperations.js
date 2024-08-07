function performAllOperations() {
    const isSquareMatrix = document.getElementById('matrixSize') !== null;
    let numRows, numCols;
    
    if (isSquareMatrix) {
        numRows = numCols = parseInt(document.getElementById('matrixSize').value);
    } else {
        numRows = parseInt(document.getElementById('numRows').value);
        numCols = parseInt(document.getElementById('numCols').value);
    }

    const matrix = [];

    // Create the matrix from inputs
    for (let i = 0; i < numRows; i++) {
        matrix[i] = [];
        for (let j = 0; j < numCols; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            matrix[i][j] = Number(cell.value);
        }
    }

    let resultHTML = '';

    // Transpose
    const transposed = transposeMatrix(matrix);
    resultHTML += '<h3>Transposed Matrix:</h3>';
    resultHTML += '<div id="transposeResult">' + matrixToHTML(transposed) + '</div>';

    // Inverse (only for square matrices)
    resultHTML += '<h3>Inverse Matrix:</h3>';
    if (numRows === numCols) {
        const inverse = invertMatrix(matrix);
        if (typeof inverse === 'string') {
            resultHTML += `<div id="inverseResult">${inverse}</div>`;
        } else {
            resultHTML += '<div id="inverseResult">' + matrixToHTML(inverse) + '</div>';
        }
    } else {
        resultHTML += '<div id="inverseResult">Inverse is only defined for square matrices.</div>';
    }

    // Determinant (only for square matrices)
    resultHTML += '<h3>Determinant of Matrix:</h3>';
    if (numRows === numCols) {
        const det = determinant(matrix);
        resultHTML += `<div id="determinantResult">The determinant is: ${det}</div>`;
    } else {
        resultHTML += '<div id="determinantResult">Determinant is only defined for square matrices.</div>';
    }

    // Trace (only for square matrices)
    resultHTML += '<h3>Trace of the Matrix:</h3>';
    if (numRows === numCols) {
        const trace = calculateTrace(matrix);
        resultHTML += `<div id="traceResult">The trace of the matrix is: ${trace}</div>`;
    } else {
        resultHTML += '<div id="traceResult">Trace is only defined for square matrices.</div>';
    }

    // Display all results
    document.getElementById('allResults').innerHTML = resultHTML;
}

function transposeMatrix(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

function invertMatrix(matrix) {
    const det = determinant(matrix);

    if (det === 0) {
        return "The matrix is not invertible (determinant is zero).";
    }

    const adj = adjugate(matrix);

    const inv = adj.map(row => row.map(val => val / det));

    return inv;
}

function determinant(matrix) {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    let det = 0;
    for (let j = 0; j < n; j++) {
        det += matrix[0][j] * cofactor(matrix, 0, j);
    }
    return det;
}

function cofactor(matrix, row, col) {
    const subMatrix = matrix.filter((_, i) => i !== row).map(row => row.filter((_, j) => j !== col));
    return Math.pow(-1, row + col) * determinant(subMatrix);
}

function adjugate(matrix) {
    const n = matrix.length;
    const adj = [];

    for (let i = 0; i < n; i++) {
        adj[i] = [];
        for (let j = 0; j < n; j++) {
            adj[i][j] = cofactor(matrix, j, i); // Note: i and j are swapped for transpose
        }
    }

    return adj;
}

function calculateTrace(matrix) {
    return matrix.reduce((sum, row, index) => sum + row[index], 0);
}

function matrixToHTML(matrix) {
    return '<table>' + matrix.map(row => 
        '<tr>' + row.map(cell => `<td>${Number(cell).toFixed(4)}</td>`).join('') + '</tr>'
    ).join('') + '</table>';
}