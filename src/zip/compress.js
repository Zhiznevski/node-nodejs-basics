import { createReadStream, createWriteStream } from "node:fs";

import { join } from "node:path";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";
import { getDirname } from "../utils/getDirname.js";

const FOLDER_NAME = "files";
const INPUT_FILE_NAME = "fileToCompress.txt";
const INPUT_FILE_PATH = join(
  getDirname(import.meta.url),
  FOLDER_NAME,
  INPUT_FILE_NAME
);

const OUTPUT_FILE_NAME = "archive.gz";
const OUTPUT_FILE_PATH = join(
  getDirname(import.meta.url),
  FOLDER_NAME,
  OUTPUT_FILE_NAME
);

const compress = async () => {
  const gzip = createGzip();
  try {
    await pipeline(
      createReadStream(INPUT_FILE_PATH),
      gzip,
      createWriteStream(OUTPUT_FILE_PATH)
    );
  } catch (err) {
    console.error(err);
  }
};

await compress();
