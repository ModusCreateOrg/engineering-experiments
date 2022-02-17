const { fork } = require('child_process');

const processes = [
    fork('./server', ['8081']),
    fork('./server', ['8082']),
    fork('./server', ['8083'])
];

console.log(`forked ${processes.length} processes`);
