import http from 'http';
import { userRouter } from './router/userRouter';

const server = http.createServer( async (req, res) => {
  await userRouter(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
