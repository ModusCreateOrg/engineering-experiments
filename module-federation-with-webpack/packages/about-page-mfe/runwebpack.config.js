const runwebpack = require('runwebpack')

const moduleFederationOptions = {
  name: 'AboutPageMFE',
  filename: 'remoteEntry.js',
  exposes: {
    './AboutPage': './src/components/AboutPage/AboutPage'
  },
  remotes: {
    LibMFE: 'LibMFE@http://localhost:8081/remoteEntry.js',
    ContentMFE: 'ContentMFE@http://localhost:8083/remoteEntry.js'
  }
}

runwebpack(moduleFederationOptions)
