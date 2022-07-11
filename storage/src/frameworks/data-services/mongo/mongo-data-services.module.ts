import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../../../config';
import { IDataServices } from '../../../core/abstracts';
import { DnaMongo, DnaSchema } from './model';
import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DnaMongo.name, schema: DnaSchema }]),
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, dbName } =
          configService.mongo;
        return {
          uri: `${connection}://${host}`,
          user,
          pass: password,
          dbName,
        };
      },
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
