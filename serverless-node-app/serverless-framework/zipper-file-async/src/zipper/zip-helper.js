const { createGzip } = require('zlib');
const { promisify } = require('util');
const { pipeline, Writable } = require('stream');

const pipe = promisify(pipeline);

module.exports = class ZipperHelper {

    static async zip(keyS3File, file) {
        try {
            let stream = Buffer.alloc(0);
            const gzip = createGzip();
            let body = [file];

            const buffering = Writable({
                write(chunk, encoding, cb) {
                    stream = Buffer.concat([stream, Buffer.from(chunk)]);
                    cb(null, chunk);
                }
            });
            await pipe(body, gzip, buffering);

            return {
                zippedFileKey: `zip/${keyS3File}.gz`,
                stream
            };
        } catch (err) {
            console.log(`Error on zip. Cause: ${err.stack}`);
            throw err;
        }
    }
}