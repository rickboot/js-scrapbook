// after npx lerna create
npm i

// if ts not installed globally
npm i -dev typescript

// create tsconfig
npx tsc --init

// tsc tsconfig mods output folder and create types
"outDir": "./dist"
"declaration": true

create dist folder!

// package.json
"main": "dist/index.js",
"types": "dist/index.d.ts",
