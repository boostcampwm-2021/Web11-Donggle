import { Schema, model } from 'mongoose';

type CoordType = [number, number];

interface Map {
  address: string;
  path: CoordType[] | CoordType[][][];
  code: string;
  codeLength: number;
  center: CoordType;
  type: 'Polygon' | 'MultiPolygon';
}

const mapSchema = new Schema<Map>({
  address: { type: String, required: true, text: true },
  path: { type: [], required: true },
  code: { type: String, required: true },
  codeLength: { type: Number, required: true, index: true },
  center: { type: [Number, Number], required: true },
  type: { type: String },
});

const MapModel = model<Map>('Map', mapSchema);

export { Map, MapModel };
