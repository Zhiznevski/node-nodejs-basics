import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} from "node:worker_threads";

if (!isMainThread) {
  const nthFibonacci = (n) =>
    n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
  const number = workerData;
  const message = nthFibonacci(number);
  parentPort.postMessage(message);
} else {
  const sendResult = () => {
    const worker = new Worker(new URL(import.meta.url), {
      workerData: 11,
    });
    worker.on("message", (message) => {
      console.log(message);
    });

    worker.on("error", (err) => console.error(err));
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  };

  sendResult();
}
