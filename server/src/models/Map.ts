import { Document, Schema, model } from 'mongoose';

type CoordType = [number, number];

interface Map {
  name: string;
  path: CoordType[] | CoordType[][];
  code: string;
  center: CoordType;
  type: 'Polygon' | 'MultiPolygon';
  children: Map[];
}

const mapSchema = new Schema<Map>({
  name: { type: String, required: true },
  path: { type: [], required: true },
  code: { type: String, required: true },
  center: { type: [Number, Number], required: true },
  type: { type: String },
});
mapSchema.add({
  children: [mapSchema],
});

const MapModel = model<Map>('Map', mapSchema);

export { Map, MapModel };
