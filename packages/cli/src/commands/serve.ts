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
  .option('-p, --port <number>', 'server port', '3333')
  .action(async (filename = 'notebook.json', options: { port: string }) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };

    try {
      const baseFilename = path.basename(filename);
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), baseFilename, dir, isDevelopment);
      console.log(
        `Opened ${filename}. Open http://localhost:${options.port} to edit.`
      );
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
