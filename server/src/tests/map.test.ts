import express from 'express';
import _http from 'http';

import mongoose from 'mongoose';
import { expressLoader } from '@loaders/index';
import request from 'supertest';

let app;
beforeAll(async() => {
  const url = process.env.MONGO_HOST || '';
  app = express();
  const http = _http.createServer(app);
  expressLoader({ app });
  http
    .listen(process.env.PORT, () => {
      console.log(`
    ################################################
    🛡️  Server listening on port: ${process.env.PORT} 🛡️
    ################################################
    `);
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
  await mongoose.connect(url);
});

test('GET /api/map/polygons 요청 시 200 반환', async() => {
  const address = encodeURI("대전광역시");
  const scope = "medium";
  const url = `/api/map/polygons?address=${address}&scope=${scope}`;
  const response = await request(app).get(url);
  // console.log(response);

  expect(response.statusCode).toBe(200);
});

