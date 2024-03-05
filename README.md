# Todo

- refactor for publishing to npm
  - add @js-hon organization prefix to local-api and local-client
  - refactor all imports to use @js-hon/local-api and @js-hon/local-client
- update package.json files for cli, client, and api
  - name
  - bin for cli and #! in its ts
  - move any dev to devDep - note that client should only have devDep since we are only publishing bundle
