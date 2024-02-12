import http from 'http';
import { config } from 'dotenv';
import { dispatcher } from './dispatcher/dispatcher';
import { multiMode } from './cluster';
config();

const MODE = process.env.MODE;
const PORT = process.env.PORT || 3000;

if (MODE === 'cluster') {
  multiMode();
} else {
  singleMode();
}

function singleMode() {
  const server = http.createServer(async (req, res) => {
    await dispatcher(req, res);
  });

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}