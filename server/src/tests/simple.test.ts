test('dotenv node_env 설정값 테스트', () => {
  expect(process.env.NODE_ENV).toBe('test');
});

test('dotenv의 mongo_user 설정값 테스트', () => {
  expect(process.env.MONGO_USER).toBe('admin');
});