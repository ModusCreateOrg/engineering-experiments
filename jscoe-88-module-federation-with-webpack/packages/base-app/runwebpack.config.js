const runwebpack = require('runwebpack')

const moduleFederationOptions = {
  name: 'BaseApp',
  remotes: {
    LibMFE: 'LibMFE@http://localhost:8081/remoteEntry.js',
    HomePageMFE: 'HomePageMFE@http://localhost:8082/remoteEntry.js',
    ContentMFE: 'ContentMFE@http://localhost:8083/remoteEntry.js',
    ContactPageMFE: 'ContactPageMFE@http://localhost:8084/remoteEntry.js',
    AboutPageMFE: 'AboutPageMFE@http://localhost:8085/remoteEntry.js'
  }
}

runwebpack(moduleFederationOptions)
