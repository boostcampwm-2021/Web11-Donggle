module.exports = {
  apps: [
    {
      name: 'App', // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
      script: './dist/app.js', // pm2로 실행될 파일 경로
      instances: 0,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development', // 개발환경시 적용될 설정 지정
      },
      env_production: {
        NODE_ENV: 'production', // 배포환경시 적용될 설정 지정
      },
    },
  ],
};
