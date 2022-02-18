const runwebpack = require('runwebpack')

const moduleFederationOptions = {
  name: 'HomePageMFE',
  filename: 'remoteEntry.js',
  exposes: {
    './HomePage': './src/components/HomePage/HomePage'
  },
  remotes: {
    LibMFE: 'LibMFE@http://localhost:8081/remoteEntry.js',
    ContentMFE: 'ContentMFE@http://localhost:8083/remoteEntry.js'
  }
}

runwebpack(moduleFederationOptions, {})
