import { User, UserModel } from '@models/User';

import AWS from 'aws-sdk';
import { v4 } from 'uuid';

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.IMAGE_ENDPOINT as string),
  region: 'kr-standard',
  credentials: {
    accessKeyId: process.env.IMAGE_ACCESSKEY as string,
    secretAccessKey: process.env.IMAGE_SECRETACCESSKEY as string,
  },
});

const patchProfileImage = async (
  username: string,
  prevImageURL: string,
  file: Express.Multer.File,
) => {
  const imageName = v4();
  const imageLink = `${process.env.IMAGE_ENDPOINT as string}/${
    process.env.IMAGE_BUCKET as string
  }/${imageName}.png`;

  try {
    await s3
      .putObject({
        Bucket: process.env.IMAGE_BUCKET as string,
        Key: `${imageName}.png`,
        ACL: 'public-read',
        Body: file.buffer,
        ContentType: 'image/png',
      })
      .promise();

    const prevImageName = prevImageURL.replace(
      `${process.env.IMAGE_ENDPOINT as string}/${
        process.env.IMAGE_BUCKET as string
      }/`,
      '',
    );
    await UserModel.updateOne({ oauthEmail: username }, { image: imageLink });
    await s3
      .deleteObject({
        Bucket: process.env.IMAGE_BUCKET as string,
        Key: prevImageName,
      })
      .promise();

    return imageLink;
  } catch {
    return '';
  }
};

const deleteProfileImage = async (username: string, imageURL: string) => {
  const imageName = imageURL.replace(
    `${process.env.IMAGE_ENDPOINT as string}/${
      process.env.IMAGE_BUCKET as string
    }/`,
    '',
  );
  await UserModel.updateOne({ oauthEmail: username }, { image: '' });
  await s3
    .deleteObject({
      Bucket: process.env.IMAGE_BUCKET as string,
      Key: imageName,
    })
    .promise();
};

export default { patchProfileImage, deleteProfileImage };
