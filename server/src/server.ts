import Express from 'express';
import routes from './routes';

const app = Express();
const port = 3333;

app.get('/', (request, response) => response.json({
  message: 'Funfou',
}));

app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});
