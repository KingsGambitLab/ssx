/* eslint-disable no-console */
require("dotenv").config();
const fs = require("fs");
const AWS = require("@aws-sdk/client-s3");
const { resolve, join } = require("path");
const { getMIMEType } = require("node-mime-types");

const {
  promises: { readdir, stat: getStats },
} = fs;
const AWS_CONFIG = {
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
};
const s3Client = new AWS.S3Client(AWS_CONFIG);

// TODO: Optimize to use aws s3 cp
// upload file
const uploadFile = async function uploadFile(filePath, params) {
  const parameters = { ...params };

  try {
    const fileStream = fs.createReadStream(filePath);

    parameters.Body = fileStream;
    parameters.ContentType = getMIMEType(filePath);
    parameters.CacheControl = "public, max-age=31556926";

    try {
      await s3Client.send(new AWS.PutObjectCommand(parameters));
      console.info(
        `${parameters.Key} (${parameters.ContentType}) uploaded in bucket ${parameters.Bucket}`,
      );
    } catch (err) {
      console.error(err);
    }
  } catch (e) {
    throw new Error(
      `unable to upload file ${filePath} at ${parameters.Key}, ${e.message}`,
    );
  }

  return true;
};

// upload directory and its sub-directories if any
const uploadDirectory = async (filePath, params, rootKey) => {
  const parameters = { ...params };
  const root = rootKey && rootKey.constructor === String ? rootKey : "";
  let dirPath;

  try {
    dirPath = resolve(filePath);
    const dirStats = await getStats(dirPath);

    if (!dirStats.isDirectory()) {
      throw new Error(`${dirPath} is not a directory`);
    }

    console.info(`uploading directory ${dirPath}...`);

    const filenames = await readdir(dirPath);
    if (Array.isArray(filenames)) {
      await Promise.all(
        filenames.map(async (filename) => {
          const nextFilepath = `${dirPath}/${filename}`;
          const fileStats = await getStats(nextFilepath);
          if (fileStats.isFile()) {
            parameters.Key = join(root, filename);
            await uploadFile(nextFilepath, parameters);
          } else if (fileStats.isDirectory()) {
            await uploadDirectory(nextFilepath, params, join(root, filename));
          }
        }),
      );
    }
  } catch (e) {
    throw new Error(`unable to upload directory ${filePath}, ${e.message}`);
  }

  console.info(`directory ${dirPath} successfully uploaded`);
  return true;
};

// Upload build folder
(async () => {
  const DEFAULT_OPTION = {
    Bucket: process.env.S3_BUCKET_NAME,
  };

  const ASSETS_PATH_PREFIX = process.env.ASSETS_PATH_PREFIX;

  try {
    console.time("s3 .next upload");
    await uploadDirectory(
      "./.next/static",
      DEFAULT_OPTION,
      `${ASSETS_PATH_PREFIX}/_next/static`,
    );
    console.timeEnd("s3 .next upload");
    console.time("s3 public upload");
    await uploadDirectory("./public", DEFAULT_OPTION, ASSETS_PATH_PREFIX);
    console.timeEnd("s3 public upload");
  } catch (e) {
    console.info(
      "Failed to run `npm postbuild` in Amplify postbuild actions...",
    );
    console.error(e);
  }
})();
