import fs from 'fs';

export default function handle(req, res) {
  const data = fs.readFileSync(process.cwd() + '/lorem.json');
  res.end(data)
}