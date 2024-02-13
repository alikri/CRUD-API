import http from 'http';
import { config } from 'dotenv';
import { dispatcher } from './dispatcher/dispatcher';
import { multiMode } from './cluster';
import { InMemoryDB } from './db/InMemoryDB';
config();

const MODE = process.env.MODE;
const PORT = process.env.PORT || 3000;
const db = new InMemoryDB();

if (MODE === 'cluster') {
  multiMode();
} else {
  singleMode(db);
}

function singleMode(db: InMemoryDB) {
  const server = http.createServer(async (req, res) => {
    await dispatcher(req, res, db);
  });

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}