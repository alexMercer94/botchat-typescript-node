import { config } from 'dotenv';
config();
import { AppServer } from './AppServer';

const appServer = new AppServer();
const PORT = process.env.PORT || 4000;
appServer.start(PORT);
