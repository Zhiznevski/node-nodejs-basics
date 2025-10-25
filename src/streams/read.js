import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";

const FILE_NAME = "fileToRead.txt";
const FILE_PATH = join("src", "streams", "files", FILE_NAME);
const input = createReadStream(FILE_PATH);

// const read = async () => {
//   input.on("readable", () => {
//     const data = input.read();
//     if (data) stdout.write(data);
//   });
// };

const read = async () => {
  try {
    await pipeline(createReadStream(FILE_PATH), stdout);
  } catch (err) {
    console.error(err);
  }
};

await read();
