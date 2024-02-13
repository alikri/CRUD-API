import os from 'os';
import http from 'http';
import cluster from 'cluster';
import { dispatcher } from './dispatcher/dispatcher';
import { InMemoryDB } from './db/InMemoryDB';

const BASE_PORT = 4000;
const numWorkers = os.cpus().length;
const workersPorts: number[] = [];
let db = { store: new InMemoryDB() };

export const multiMode = async () => {
  if (cluster.isPrimary) {

    console.log(`Primary ${process.pid} is running`);

    for (let i = 1; i <= numWorkers; i++) {
      const workerPort = BASE_PORT + i;
      cluster.fork({ PORT: workerPort.toString() });
      workersPorts.push(workerPort);
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died`);
    });

    let currentIndex = 0;
    http
      .createServer((req, res) => {
        const options = {
          hostname: 'localhost',
          port: workersPorts[currentIndex],
          path: req.url,
          method: req.method,
          headers: req.headers,
        };

        const proxy = http.request(options, (r) => {
          r.pipe(res, { end: true });
        });

        req.pipe(proxy, { end: true });

        currentIndex = (currentIndex + 1) % workersPorts.length;
      })
      .listen(BASE_PORT, () => console.log(`Load balancer running on port ${BASE_PORT}`));
  } else {
    const port = Number(process.env.PORT);
    http
      .createServer((_req, res) => {
        dispatcher(_req, res, db.store);
      })
      .listen(port, () => console.log(`Worker ${process.pid} started, listening on port ${port}`));
  }
};


