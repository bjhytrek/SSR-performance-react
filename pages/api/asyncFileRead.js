import fs from "fs";

const readFilePromise = file => {
  return new Promise((ok, notOk) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        notOk(err);
      } else {
        ok(data);
      }
    });
  });
};

export default function handle(req, res) {
  readFilePromise(process.cwd() + "/lorem.json").then(data => res.end(data));
}
