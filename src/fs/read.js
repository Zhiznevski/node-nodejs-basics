import { readFile } from "node:fs/promises";
import path from "node:path";

const FILE_NAME = "fileToRead.txt";
const FILE_PATH = path.join("src", "fs", "files", FILE_NAME);
const ERROR_MESSAGE = "FS operation failed";

const read = async () => {
  try {
    const res = await readFile(FILE_PATH, {
      encoding: "utf8",
    });
    console.log(res);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await read();
