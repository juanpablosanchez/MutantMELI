import { Injectable } from '@nestjs/common';

@Injectable()
export class MatrixService {
  /**
   * Obtiene una matriz de carácteres y retorna las diferentes combinaciones
   * como lo son, Horizontal, Verticla, diagonal a la izquierda y disgonal a la derecha
   * @param {string[]} matrix - string[] - matriz de carácteres
   */
  getCombineSequences(matrix: string[]): string[] {
    const horizontal = [...matrix];
    const vertical = [];
    const diagonalLeftRight = [];
    const diagonalRightLeft = [];

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const row = matrix[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const item = row[colIndex];

        const leftRightIndex = this.getDiagonalLeftRightIndex(
          colIndex,
          rowIndex,
          row.length,
        );
        const rightLeftIndex = this.getDiagonalRightLeftIndex(
          colIndex,
          rowIndex,
        );

        vertical[colIndex] = (vertical[colIndex] || '') + item;
        diagonalLeftRight[leftRightIndex] =
          (diagonalLeftRight[leftRightIndex] || '') + item;
        diagonalRightLeft[rightLeftIndex] =
          (diagonalRightLeft[rightLeftIndex] || '') + item;
      }
    }

    return [
      ...horizontal,
      ...vertical,
      ...diagonalLeftRight,
      ...diagonalRightLeft,
    ];
  }

  /**
   * De acuerdo a una lista de string
   * determina si hay carácteres que se repiten mas de @param repeatedCharacters
   * y si estos carácteres repetidos se ocurren mas de @param repeatedSequences
   * @param {string[]} charactersList - string[] - lista de carácteres a validar
   * @param {number} repeatedCharacters - number - cantidad sw vwwa que se repite los carácteres
   * @param {number} repeatedSequences - number - cantidad de veces que se repite las secuencias de carácteres
   */
  validateRepeatedCharacters(
    charactersList: string[],
    repeatedCharacters: number,
    repeatedSequences: number,
  ): boolean {
    const listFiltered = charactersList.filter(
      (row) => row.length >= repeatedCharacters,
    );
    const regexValidator = new RegExp(`(.)\\1{${repeatedCharacters - 1}}`, 'g');

    const validateRegex = listFiltered.toString().match(regexValidator);
    const matches = validateRegex ? validateRegex.length : 0;

    return matches > repeatedSequences;
  }

  private getDiagonalRightLeftIndex(
    colIndex: number,
    rowIndex: number,
  ): number {
    return colIndex + rowIndex;
  }

  private getDiagonalLeftRightIndex(
    colIndex: number,
    rowIndex: number,
    total: number,
  ): number {
    let diagonalLeftRightIndex = colIndex - rowIndex;
    diagonalLeftRightIndex =
      diagonalLeftRightIndex < 0
        ? total + Math.abs(diagonalLeftRightIndex) - 1
        : diagonalLeftRightIndex;

    return diagonalLeftRightIndex;
  }
}
