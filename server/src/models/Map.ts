import { Document, Schema, model } from 'mongoose';

interface Map extends Document {
  name: string;
  path: Array<[number, number]>;
  center: [number, number];
  children?: Map[];
}

const mapSchema = new Schema<Map>({
  name: { type: String, required: true },
  path: { type: [[Number, Number]], required: true },
  center: { type: [Number, Number], required: true },
});
mapSchema.add({
  children: [mapSchema],
});

const MapModel = model<Map>('Map', mapSchema);

export default MapModel;
