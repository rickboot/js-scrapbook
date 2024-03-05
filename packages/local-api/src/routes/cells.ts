import express from 'express';
var bodyParser = require('body-parser');
import fs from 'fs/promises';
import path from 'path';

export const createCellRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(bodyParser.json());

  const filePath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    let cellData = '';

    interface LocalApiError {
      code: string;
    }

    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };

    try {
      cellData = await fs.readFile(filePath, { encoding: 'utf8' });
      res.status(200).send(JSON.parse(cellData));
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === 'ENOENT') {
          await fs.writeFile(filePath, '[]', 'utf8');
          res.status(200).json([]);
        } else {
          throw err;
        }
      }
    }
  });

  router.post('/cells', async (req, res) => {
    try {
      let cellData = await req.body.data;
      fs.writeFile(filePath, JSON.stringify(cellData));
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  return router;
};
