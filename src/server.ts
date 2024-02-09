import http from 'http';
import { config } from 'dotenv';
import { dispatcher } from './dispatcher/dispatcher';
config();

const server = http.createServer( async (req, res) => {
  await dispatcher(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
