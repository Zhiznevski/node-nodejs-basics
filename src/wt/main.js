import os from "node:os";
import { Worker } from "node:worker_threads";

const createWorker = async (val) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./src/wt/worker.js", {
      workerData: val,
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

const performCalculations = async () => {
  const numberOfCPU = os.cpus().length;
  let numberToWorker = 10;
  const promises = [];
  for (let i = 0; i < numberOfCPU; i++) {
    promises.push(createWorker(numberToWorker));
    numberToWorker++;
  }

  const res = await Promise.allSettled(promises);
  const result = res.map((el) =>
    el.status === "fulfilled"
      ? { status: "resolved", data: el.value }
      : { status: "error", data: null }
  );
  console.log(result);
};

await performCalculations();
