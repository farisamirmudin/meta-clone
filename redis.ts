import Redis from 'ioredis'
const client = new Redis(process.env.REDIS_URI!);

export default client