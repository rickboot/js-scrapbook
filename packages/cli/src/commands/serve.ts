import { Command } from 'commander';
import { serve } from '@js-scrapbook/local-api';
import path from 'node:path';

const isDevelopment = process.env.NODE_ENV === 'development';

interface LocalApiError {
  code: string;
}

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Launch server with local file')
  .option('-p, --port <port>', 'server port', '3333')
  .action(async (filename = 'notebook.json', { port }) => {
    const baseFilename = path.basename(filename);
    const dir = path.dirname(filename);

    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };

    try {
      await serve(parseInt(port), baseFilename, dir, isDevelopment);
      console.log(`App running at http://localhost:${port}`);
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === 'EADDRINUSE') {
          console.error('Port is in use. Try running on a different port.');
        }
      } else if (err instanceof Error) {
        console.log('Heres the problem', err.message);
      }
      process.exit(1);
    }
  });
