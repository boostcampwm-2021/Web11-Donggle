import { Schema, model } from 'mongoose';

type CoordType = [number, number];

interface Categories {
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
}

const rateSchema = new Schema<Categories>({
  safety: { type: Number, required: true },
  traffic: { type: Number, required: true },
  food: { type: Number, required: true },
  entertainment: { type: Number, required: true },
});

interface MapInfo {
  address: string;
  code: string;
  codeLength: number;
  center: CoordType;
  count: number;
  //현재는 리뷰 정보가 없으므로 require를 false로함
  categories: Categories;
  // eslint-disable-next-line @typescript-eslint/ban-types
  hashtags: Map<string, number>;
}

const mapInfoSchema = new Schema<MapInfo>({
  address: { type: String, required: true, text: true },
  code: { type: String, required: true },
  codeLength: { type: Number, required: true, index: true },
  center: { type: [Number, Number], required: true },
  count: { type: Number, required: true, default: 0 },
  //현재는 리뷰 정보가 없으므로 require를 false로함
  categories: { type: rateSchema, required: true },
  hashtags: { type: Schema.Types.Map, of: String, required: true },
});

const MapInfoModel = model<MapInfo>('MapInfo', mapInfoSchema);

export { MapInfo, MapInfoModel };
