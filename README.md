# js-scrapbook

### Based on Stephen Grider's React and TypeScript

#### What it is:

This is a multi-part project web application that allows creating and editing JavaScript code scrapbooks and markdown text.

The project components include:

- Web app - allows editing and running of JavaScript and React code and markdown text cells (collectively known as a 'scrapbook');
- CLI - command line utility to launch the local API and client
- Local API - serves local web client and provides REST API for loading and saving of local files.

#### Built with:

- Lerna - to create multiple-package monorepo and to publish project to NPM (as js-scrapbook)
- React
- TypeScript
- redux and redux-thunk for client pp state
- express and axios for REST API
- esbuild (wasm) - for blazing-fast in-browser translation and bundling of JavaScript/TypeScript, CSS, and NPM modules
- unpkg.com - a global NPM CDN
- localForage - provides fast, simple, async storage using IndexedDB - used in project as a cache for NPM bundles

#### How to use

1. To install, run `npm i js-scrapbook`
2. At command line, ``

- custom esbuild plugin - fetches all files for an npm package from unpkg.com (need because by default esbuild will try to import from filesystem (which doesn't exist in browser))
