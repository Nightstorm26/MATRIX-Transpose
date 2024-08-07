export function transposeMatrix() 
{
    const isSquareMatrix = window.location.href.includes('square.html');
    let numRows, numCols;
    
    if (isSquareMatrix) {
        numRows = numCols = parseInt(document.getElementById('matrixSize').value);
    } else {
        numRows = parseInt(document.getElementById('numRows').value);
        numCols = parseInt(document.getElementById('numCols').value);
    }

    const matrix = [];

    for (let i = 0; i < numRows; i++) {
        matrix[i] = [];
        for (let j = 0; j < numCols; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            matrix[i][j] = Number(cell.value);
        }
    }

    const transposedMatrix = [];
    for (let i = 0; i < numCols; i++) {
        transposedMatrix[i] = [];
        for (let j = 0; j < numRows; j++) {
            transposedMatrix[i][j] = matrix[j][i];
        }
    }

    let resultHTML="<h3>Transposed Matrix:</h3>";
    resultHTML += "<br>";
    resultHTML += '<table>';
    for (let i = 0; i < numCols; i++) {
        resultHTML += '<tr>';
        for (let j = 0; j < numRows; j++) {
            resultHTML += `<td>${transposedMatrix[i][j]}</td>`;
        }
        resultHTML += '</tr>';
    }
    resultHTML += '</table>';

    document.getElementById('transposeResult').innerHTML = resultHTML;
}