import { Injectable } from '@nestjs/common';

@Injectable()
export class MatrixService {
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

  validateRepeatedCharacters(
    charactersList: string[],
    repeatedCharacters: number,
    repeatedSequences: number,
  ): boolean {
    const listFiltered = charactersList.filter(
      (row) => row.length >= repeatedCharacters,
    );
    const regexValidator = new RegExp(`(.)\\1{${repeatedCharacters - 1}}`, 'g');

    // let matches = 0;
    // for (let i = 0; i < listFiltered.length; i++) {
    //   const validateRegex = listFiltered[i].match(regexValidator);
    //   const characterRepeated = validateRegex ? validateRegex.length : 0;
    //   matches += characterRepeated;

    //   if (matches > repeatedSequences) {
    //     break;
    //   }
    // }
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
