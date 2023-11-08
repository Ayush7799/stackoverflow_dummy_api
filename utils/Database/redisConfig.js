import redis from 'redis';
import {promisify} from 'util';

export const client = redis.createClient();

export const GET_ASYNC = promisify(client.get).bind(client);
export const SET_ASYNC = promisify(client.set).bind(client);



client.on('connect', data => console.log('Redis Client Connected'));

client.on('error', err => console.log('Redis Client Error', err));

