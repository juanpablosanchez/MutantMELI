import { MatrixService } from './matrix.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';

describe('MatrixService', () => {
  let moduleRef: TestingModule;
  let matrixService: MatrixService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    matrixService = moduleRef.get<MatrixService>(MatrixService);
  });

  describe('getCombineSequences method', () => {
    it('should return matriz in horizontal, vertical, diagonal to left and diagonal to right', () => {
      const matrixData = {
        data: ['AAAAGA', 'GGCCTC', 'GTAATC', 'CGTGGC', 'CACTAC', 'AATCTA'],
        expected: [
          'AAAAGA',
          'GGCCTC',
          'GTAATC',
          'CGTGGC',
          'CACTAC',
          'AATCTA',
          'AGGCCA',
          'AGTGAA',
          'ACATCT',
          'ACAGTC',
          'GTTGAT',
          'ACCCCA',
          'AGAGAA',
          'ACAGC',
          'ACTC',
          'ATC',
          'GC',
          'A',
          'GTTTT',
          'GGCC',
          'CAT',
          'CA',
          'A',
          'A',
          'AG',
          'AGG',
          'ACTC',
          'GCAGC',
          'ATATAA',
          'CTGCA',
          'CGTT',
          'CAC',
          'CT',
          'A',
        ],
      };
      const response = matrixService.getCombineSequences(matrixData.data);

      expect(response).toEqual(matrixData.expected);
    });
  });

  describe('validateRepeatedCharacters method', () => {
    it('should validate array searching repeat characters', () => {
      const matrixData = [
        {
          data: ['AAAAGA', 'GTCCCC', 'ATCGAT', 'ATCGAT', 'ATCGAT', 'ATCGAT'],
          expected: true,
        },
        {
          data: ['ATCGAT', 'ATTTTT', 'ATCGAT', 'ATCGAT', 'ACCCCT', 'ATCGAT'],
          expected: true,
        },
        {
          data: ['ATCGAT', 'ATCGAT', 'ATCGAT', 'ATTTTT', 'ATCGAT', 'ATCGAT'],
          expected: false,
        },
        {
          data: ['ATCGAT', 'ATCCCT', 'ATCGAT', 'ATCGAT', 'AAAGAT', 'ATCGAT'],
          expected: false,
        },
        {
          data: ['ATCGAT', 'AGGGGT', 'ATCGAT', 'ATCGAT', 'ATCGAT', 'CCCCAT'],
          expected: true,
        },
      ];

      const response = matrixData.map((matrix) => ({
        result: matrixService.validateRepeatedCharacters(matrix.data, 4, 1),
        expected: matrix.expected,
      }));

      expect(
        response.every((matrix) => matrix.result === matrix.expected),
      ).toBe(true);
    });
  });

  afterEach(() => {
    moduleRef.close();
  });
});
