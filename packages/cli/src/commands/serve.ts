import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'node:path';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Launch server with local file')
  .option('-p, --port <port>', 'server port', '3333')
  .action(async (filename = 'notebook.json', { port }) => {
    const baseFilename = path.basename(filename);
    const dir = path.dirname(filename);

    try {
      await serve(parseInt(port), baseFilename, dir, !isProduction);
      console.log(`App running at http://localhost:${port}`);
    } catch (err) {
      if (err) {
        if (typeof err === 'object' && 'message' in err && 'port' in err) {
          console.log(
            `Port ${err.port} already in use. Try another. Example: serve -p 2112`
          );
        }
      }
    }
  });