import { cp } from "node:fs/promises";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { errorConstants } from "../utils/errorConstants.js";

const FOLDER_NAME = "files";
const FOLDER_PATH = path.join(getDirname(import.meta.url), FOLDER_NAME);
const FOLDER_COPY_NAME = "files_copy";
const FOLDER_COPY_PATH = path.join(
  getDirname(import.meta.url),
  FOLDER_COPY_NAME
);
const ERROR_MESSAGE = "FS operation failed";

const copy = async () => {
  try {
    await cp(FOLDER_PATH, FOLDER_COPY_PATH, {
      recursive: true,
      errorOnExist: true,
      force: false,
    });
  } catch (err) {
    if (
      err.code === errorConstants.ENOENT ||
      err.code === errorConstants.ERR_FS_CP_EEXIST
    ) {
      throw new Error(ERROR_MESSAGE);
    }
    console.error(err);
  }
};

await copy();
