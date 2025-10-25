import path from "node:path";
import { release, version } from "node:os";
import { createServer as createServerHttp } from "node:http";
import url from "node:url";

import "./files/c.cjs";

const random = Math.random();

let unknownObject;
if (random > 0.5) {
  const { default: data } = await import("./files/a.json", {
    with: { type: "json" },
  });
  unknownObject = data;
} else {
  const { default: data } = await import("./files/b.json", {
    with: { type: "json" },
  });
  unknownObject = data;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${url.fileURLToPath(import.meta.url)}`);
console.log(
  `Path to current directory is ${path.dirname(
    url.fileURLToPath(import.meta.url)
  )}`
);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
