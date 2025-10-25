import { stdin, stdout } from "node:process";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

const reverse = new Transform({
  transform(data, _, cb) {
    this.push(data.toString().split("").reverse().join(""));
    cb();
  },
});

const transform = async () => {
  try {
    await pipeline(stdin, reverse, stdout);
  } catch (err) {
    console.error(err);
  }
};

await transform();
