import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DnaDocument = DnaMongo & Document;

@Schema()
export class DnaMongo {
  @Prop()
  dnaSequence: string[];

  @Prop()
  isMutant: boolean;
}

export const DnaSchema = SchemaFactory.createForClass(DnaMongo);
