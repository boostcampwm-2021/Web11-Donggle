import { Schema, model } from 'mongoose';

type CoordType = [number, number];

interface SimpleMap {
  name: string;
  codeLength: number;
  center: CoordType;
}

const simpleMapSchema = new Schema<SimpleMap>({
  name: { type: String, required: true, text: true },
  codeLength: { type: Number, required: true, index: true },
  center: { type: [Number, Number], required: true },
});

const SimpleMapModel = model<SimpleMap>('SimpleMap', simpleMapSchema);

export { SimpleMap, SimpleMapModel };
