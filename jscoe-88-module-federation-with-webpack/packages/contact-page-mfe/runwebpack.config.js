const runwebpack = require('runwebpack')

const moduleFederationOptions = {
  name: 'ContactPageMFE',
  filename: 'remoteEntry.js',
  exposes: {
    './ContactPage': './src/components/ContactPage/ContactPage'
  },
  remotes: {
    LibMFE: 'LibMFE@http://localhost:8081/remoteEntry.js',
    ContentMFE: 'ContentMFE@http://localhost:8083/remoteEntry.js'
  }
}

runwebpack(moduleFederationOptions)
