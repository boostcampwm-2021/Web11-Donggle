import { describe, expect, test } from '@jest/globals';

test('dotenv 설정값 테스트', () => {
  expect(process.env.NODE_ENV).toBe('test');
});