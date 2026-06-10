import app from './app.js';
import 'dotenv/config'; // deve vir primeiro
import { env } from './config/env.js';

app.listen(process.env.PORT || 3333, () => {
  console.log(`Servidor na porta ${env.PORT}`);
});
