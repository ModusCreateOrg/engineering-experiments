import * as dotenv from 'dotenv';
import {join} from 'path';
import AppClass from "./app";

dotenv.config({path: join(__dirname, '.env')});

new AppClass();