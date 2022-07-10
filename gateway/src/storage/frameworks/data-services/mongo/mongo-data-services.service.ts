import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from 'src/core/abstracts';
import { DnaDocument, DnaMongo } from './model';
import { MongoRepository } from './mongo-generic-repository';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  dnaRepository: MongoRepository<DnaMongo>;

  constructor(
    @InjectModel(DnaMongo.name)
    private readonly DnaRepository: Model<DnaDocument>,
  ) {}

  onApplicationBootstrap() {
    this.dnaRepository = new MongoRepository<DnaMongo>(this.DnaRepository);
  }
}
