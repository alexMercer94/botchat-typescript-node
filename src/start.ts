import { config } from 'dotenv';
config();
import { AppServer } from './AppServer';

const appServer = new AppServer();
const port = process.env.PORT || 4000;
appServer.start(port);
