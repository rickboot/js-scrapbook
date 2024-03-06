import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  app.use(createCellRouter(filename, dir));

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://127.0.0.1:3030',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    const clientPath = require.resolve(
      '@js-scrapbook/local-client/build/index.html'
    );
    const staticPath = path.dirname(clientPath);
    console.log('staticPath', staticPath);
    app.use(express.static(staticPath));
  }

  return new Promise<void>((resolve, reject): void => {
    app.listen(port, resolve).on('error', reject);
  });
};
