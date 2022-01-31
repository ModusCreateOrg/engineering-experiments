# JSCOE-88 | Module Federation with Webpack

## Getting started

- This PoC project is a Lerna-based monorepo project.
- Checkout the repo to your local machine.
- cd to the directory js-coe-experiments/jscoe-88-module-federation-with-webpack
- Run install command

```bash
npm install
```

- Run the bootstrap npm script; This script will install all the dependencies of all the packages.

```bash
npm run bootstrap
```

- Run the build-serve npm script.
- Every package has the build-serve npm script. This command will invoke all of them.

```bash
npm run build-serve
```

- Once package is up and running, you can access the application at http://localhost:8080
- The app and all of the MFEs will be in production mode when invoked with build-serve npm script.
- If you want to work in development mode, go to the individual package and run `npm start`.
