import { Schema, model } from 'mongoose';

type CoordType = [number, number];

interface Rate {
  count: number;
  total: number;
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
}

const rateSchema = new Schema<Rate>({
  count: { type: Number, required: true },
  total: { type: Number, required: true },
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
  //현재는 리뷰 정보가 없으므로 require를 false로함
  rate?: Rate;
}

const mapInfoSchema = new Schema<MapInfo>({
  address: { type: String, required: true, text: true },
  code: { type: String, required: true },
  codeLength: { type: Number, required: true, index: true },
  center: { type: [Number, Number], required: true },
  //현재는 리뷰 정보가 없으므로 require를 false로함
  rate: { type: rateSchema, required: false },
});

const MapInfoModel = model<MapInfo>('MapInfo', mapInfoSchema);

export { MapInfo, MapInfoModel };
