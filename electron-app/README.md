## Prerequisite
1. Javascript
2. Typescript
3. CSS (Material UI)
4. React

## System Prerequisite
1. Node 14.17.5
2. NPM 6.14.14

## Development setup
```
cd src/renderer
npm i
npm run build
npm start

cd src/main
npm i
npm run tsc:watch

cd dist
npm i

cd src/main
npm run start:dev
```

## Production setup
```
cd src/renderer
npm i
npm run build

cd src/main
npm i
npm run tsc

cd dist
npm i
npm run dist
```