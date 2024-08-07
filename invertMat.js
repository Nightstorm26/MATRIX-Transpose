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
    let resultHTML="<h3>Inverted Matrix:</h3>";
    resultHTML += "<br>";
    resultHTML += '<table>';
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

    if (n === 1) {
        return matrix[0][0];
    }
    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let j = 0; j < n; j++) {
        det += Math.pow(-1, j) * matrix[0][j] * determinant(minor(matrix, 0, j));
    }
    return det;
}

function minor(matrix, row, col) {
    return matrix
        .filter((_, i) => i !== row)
        .map(row => row.filter((_, j) => j !== col));
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
        document.getElementById('determinantResult').innerHTML = "<h3>Determinant of the Matrix:</h3>Non-square matrices don't have a determinant.";
        return;
    }

    const matrix = [];

    // Create the matrix from inputs
    for (let i = 0; i < numRows; i++) {
        matrix[i] = [];
        for (let j = 0; j < numCols; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            if (!cell || isNaN(Number(cell.value))) {
                document.getElementById('determinantResult').innerHTML = "<h3>Determinant of the Matrix:</h3>Error: Invalid input in the matrix.";
                return;
            }
            matrix[i][j] = Number(cell.value);
        }
    }

    // Calculate the determinant
    try {
        const det = determinant(matrix);

        // Display the result
        let resultHTML = "<h3>Determinant of the Matrix:</h3>";
        if (Math.abs(det) < 1e-10) {
            resultHTML += "The determinant is approximately zero (matrix is singular).";
        } else if (Math.abs(det) > 1e10 || Math.abs(det) < 1e-10) {
            resultHTML += `The determinant is: ${det.toExponential(4)}`;
        } else {
            resultHTML += `The determinant is: ${det.toFixed(4)}`;
        }
        document.getElementById('determinantResult').innerHTML = resultHTML;
    } catch (error) {
        document.getElementById('determinantResult').innerHTML = "<h3>Determinant of the Matrix:</h3>Error calculating determinant. Please check your inputs.";
    }
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