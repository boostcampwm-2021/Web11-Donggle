import logger from '@loaders/loggerLoader';
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
  oauth_email: string,
  prevImage: string,
  file: Express.Multer.File,
) => {
  const imageName = v4();
  const image = `${process.env.IMAGE_ENDPOINT as string}/${
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

    const prevImageName = prevImage.replace(
      `${process.env.IMAGE_ENDPOINT as string}/${
        process.env.IMAGE_BUCKET as string
      }/`,
      '',
    );
    void UserModel.updateOne({ oauth_email }, { image }).then(() =>
      logger.info('User update image success!'),
    );
    void s3
      .deleteObject({
        Bucket: process.env.IMAGE_BUCKET as string,
        Key: prevImageName,
      })
      .promise()
      .then(() => logger.info('delete prev image from S3 success!'))
      .catch((err) => {
        logger.info('s3 error below... but ok!');
        logger.info(err);
      });

    return image;
  } catch {
    return '';
  }
};

const deleteProfileImage = async (oauth_email: string, image: string) => {
  const imageName = image.replace(
    `${process.env.IMAGE_ENDPOINT as string}/${
      process.env.IMAGE_BUCKET as string
    }/`,
    '',
  );
  const deletedDocument = await UserModel.updateOne(
    { oauth_email },
    { image: '' },
  );
  void s3
    .deleteObject({
      Bucket: process.env.IMAGE_BUCKET as string,
      Key: imageName,
    })
    .promise()
    .then(() => logger.info('delete image from S3 success!'));

  return deletedDocument;
};

const updateAddress = async (oauth_email: string, address: string) => {
  try {
    const updatedDocument = await UserModel.updateOne(
      { oauth_email },
      { address },
    ).then(() => logger.info(`${oauth_email} address updated!`));
    return updatedDocument;
  } catch (e) {
    logger.error(e);
    return false;
  }
};

export default { patchProfileImage, deleteProfileImage, updateAddress };
