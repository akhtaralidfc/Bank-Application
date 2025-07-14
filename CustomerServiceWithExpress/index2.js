import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './db.js';
import connectMongo from './mongo.js';
import customerRoutes from './routes/customerRoutes.js';
import { Eureka } from 'eureka-js-client';
import os from 'os';


const app = express();
const PORT = 8082;

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

// Eureka client setup
const client = new Eureka({
  instance: {
    app: 'CustomerService',
    instanceId: `${os.hostname()}:CustomerService:${PORT}`,
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: { '$': PORT, '@enabled': true },
    vipAddress: 'CustomerService',
    statusPageUrl: `http://localhost:${PORT}/info`,
    healthCheckUrl: `http://localhost:${PORT}/health`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});

client.start((error) => {
  if (error) console.log('Eureka registration failed:', error);
  else console.log('Customer service registered with Eureka');
});

app.get('/CustomerService/health', (req, res) => res.send('OK'));
app.get('/CustomerService/info', (req, res) => res.send('Customer Service running'));
// app.use((req, res, next) => {
//   console.log(`[Express] ${req.method} ${req.originalUrl}`);
//   next();
// });
app.use('/', customerRoutes);
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL connected');
        await connectMongo();
        console.log(`✅ Customer service running on http://localhost:${PORT}`);
    } catch (err) {
        console.error('Failed to start service', err);
    }
});
