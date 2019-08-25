const redis = require('redis');
const {RateLimiterRedis} = require('rate-limiter-flexible');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const redisClient = redis.createClient({
  enable_offline_queue: false,
});

const rateLimiter = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: 'middleware',
  points: 40, // 60 requests
  duration:1,
  inmemoryBlockOnConsumed: 50,
  inmemoryBlockDuration: 30,
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume((Math.floor(Math.random() * 5).toString()))
    .then(() => {
      res.status(200).json({}).end();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests').end();
    });
};

module.exports = rateLimiterMiddleware;
