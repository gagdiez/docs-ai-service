import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes';
import cors from 'cors';
import { env } from './config/env';

const app = express();
const port = env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
