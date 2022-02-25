import { createGzip } from 'zlib';
import { promisify } from 'util';
import { pipeline, Writable } from 'stream';
import {
	IZipValues,
} from './interfaces';

const pipe = promisify(pipeline);

export default class ZipperHelper {

    static async zip(keyS3File: string, file: string): Promise<IZipValues> {
        try {
            let stream = Buffer.alloc(0);
            const gzip = createGzip();
            let body = [file];

            const buffering = new Writable({
                write(chunk, encoding, cb) {
                    stream = Buffer.concat([stream, Buffer.from(chunk)]);
                    cb(chunk);
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