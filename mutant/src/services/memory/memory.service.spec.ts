import { MemoryService } from './memory.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Dna } from '../../core/entities/dna.entity';
import { AppModule } from '../../app.module';

describe('MemoryService', () => {
  let moduleRef: TestingModule;
  let memoryService: MemoryService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    memoryService = moduleRef.get<MemoryService>(MemoryService);
  });

  it('should save in memory an ADN', () => {
    const dnaData: Dna = { dnaSequence: 'ASDFGH,ZXCVBN', isMutant: true };

    memoryService.addDna(dnaData);
    const response = memoryService.getIsMutant(dnaData.dnaSequence);

    expect(response).toBe(true);
  });

  it('should return null when de DNA not exist', () => {
    const response = memoryService.getIsMutant('QWEQWE,ASDASD');

    expect(response).toBeNull();
  });

  afterEach(() => {
    moduleRef.close();
  });
});
