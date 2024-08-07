export function invertMatrix() {
    const isSquareMatrix = window.location.href.includes('square.html');
    let numRows, numCols;
    
    if (isSquareMatrix) {
        numRows = numCols = parseInt(document.getElementById('matrixSize').value);
    } else {
        numRows = parseInt(document.getElementById('numRows').value);
        numCols = parseInt(document.getElementById('numCols').value);
    }

    if (numRows !== numCols) {
        document.getElementById('inverseResult').innerHTML = "The matrix must be square to have an inverse.";
        return;
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

    // Calculate the determinant
    const det = determinant(matrix);

    if (det === 0) {
        document.getElementById('inverseResult').innerHTML = "The matrix is not invertible (determinant is zero).";
        return;
    }

    // Calculate the adjugate matrix
    const adj = adjugate(matrix);

    // Calculate the inverse
    const inv = [];
    for (let i = 0; i < numRows; i++) {
        inv[i] = [];
        for (let j = 0; j < numCols; j++) {
            inv[i][j] = adj[i][j] / det;
        }
    }

    let resultHTML = '<table>';
    for (let i = 0; i < numRows; i++) {
        resultHTML += '<tr>';
        for (let j = 0; j < numCols; j++) {
            resultHTML += `<td>${inv[i][j].toFixed(4)}</td>`;
        }
        resultHTML += '</tr>';
    }
    resultHTML += '</table>';

    document.getElementById('inverseResult').innerHTML = resultHTML;
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

//Determinant Call Function
export function calculateDeterminant() {
    const isSquareMatrix = document.getElementById('matrixSize') !== null;
    let numRows, numCols;
    
    if (isSquareMatrix) {
        numRows = numCols = parseInt(document.getElementById('matrixSize').value);
    } else {
        numRows = parseInt(document.getElementById('numRows').value);
        numCols = parseInt(document.getElementById('numCols').value);
    }

    if (numRows !== numCols) {
        document.getElementById('determinantResult').innerHTML = "Non-square Matrices doesn't have a Determinant.";
        return;
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

    // Calculate the determinant
    const det = determinant(matrix);

    // Display the result
    document.getElementById('determinantResult').innerHTML = `The determinant is: ${det}`;
}

function cofactor(matrix, row, col) {
    const subMatrix = [];
    const n = matrix.length;

    for (let i = 0; i < n; i++) {
        if (i === row) continue;
        const subRow = [];
        for (let j = 0; j < n; j++) {
            if (j === col) continue;
            subRow.push(matrix[i][j]);
        }
        subMatrix.push(subRow);
    }

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