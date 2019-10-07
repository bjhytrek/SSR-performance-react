import fetch from "isomorphic-unfetch";
import { performance } from "perf_hooks";
const NUM_TIMES = 300;

const delayFetch = (thunk) => () => {
  return new Promise(
    resolve => setTimeout(
      () => thunk()
        .then(resolve),
      50
    )
  );
};

export default async (req, res) => {
  const startSync = performance.now();
  await Promise.all(
    Array(NUM_TIMES)
      .fill(0)
      .map(delayFetch(() => fetch("http://localhost:3000/api/syncFileRead")))
  ).catch(console.log);
  const result1 = `Sync done: ${performance.now() - startSync}`;

  const startAsync = performance.now();
  await Promise.all(
    Array(NUM_TIMES)
      .fill(0)
      .map(delayFetch(() => fetch("http://localhost:3000/api/asyncFileRead")))
  ).catch(console.log);
  const result2 = `Async done: ${performance.now() - startAsync}`;

  res.end(result1 + "\n\n" + result2);
};
