import proj4 from 'proj4';

interface ChangedCoords {
  name: string;
  path: Array<[number, number]>;
}

const dongTransCoord = (wtmX: number, wtmY: number): any => {
  const geocoder = new kakao.maps.services.Geocoder(); // 좌표계 변환 객체를 생성합니다
  // WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다
  return new Promise((resolve, reject) =>
    geocoder.transCoord(
      wtmX,
      wtmY,
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) resolve(result);
        else reject(status);
      },
      {
        input_coord: kakao.maps.services.Coords.WTM, // 변환을 위해 입력한 좌표계 입니다
        output_coord: kakao.maps.services.Coords.WGS84, // 변환 결과로 받을 좌표계 입니다
      },
    ),
  );
};

const transCoord = async () => {
  // accesstoken 받아오는 함수
  // const kostatAccessToken: any = await fetch(
  //   'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=5980a2ee6e374ea98483&consumer_secret=8f2fb6a2fa6a4800861e',
  // )
  //   .then((res) => res.json())
  //   .then((json) => json.result.accessToken);

  const geoJson: any = await fetch(
    `https://sgisapi.kostat.go.kr/OpenAPI3/boundary/hadmarea.geojson?accessToken=a559b64f-27ff-4767-abc3-d5dd4194db56&year=2021&adm_cd=11010`,
  ).then((res) => res.json());

  const wgs84 =
    '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees';
  const grs80 =
    '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs';
  const changedCoords: Array<ChangedCoords> = [];

  for await (const dong of geoJson.features) {
    const geoMetryCoord: ChangedCoords = {
      name: dong.properties.adm_nm,
      path: [],
    };

    const delayedLog = async (coord, index) => {
      const [proLong, proLat] = proj4(grs80, wgs84, coord);
      geoMetryCoord.path[index] = [proLat, proLong];
    };
    const promises = dong.geometry.coordinates[0].map(delayedLog);
    await Promise.all(promises);
    changedCoords.push(geoMetryCoord);
  }
  return changedCoords;
};

export default transCoord;
