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

1. The project can be run remotely using npx.

   `npx js-scrapbook serve`

#### How to build

TBD

#### How it works

TBD

#### Possible updates

- public portal with auth login and database
- auto-sizing code and text cells
- next.js version
- esbuild update - is plugin hack still needed to bundle npm modules in browser?
- migrate redux to RTK
