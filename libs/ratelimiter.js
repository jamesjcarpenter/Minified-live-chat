const redis = require('redis');
const {RateLimiterRedis} = require('rate-limiter-flexible');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const redisClient = redis.createClient({
  enable_offline_queue: false,
});

const rateLimiter = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: 'middleware',
  points: 300, // Number of points
  duration: 60, // Per 60 seconds,
  blockDuration: 120, // Block duration in store
  inmemoryBlockOnConsumed: 301, // If userId or IP consume >300 points per minute
  inmemoryBlockDuration: 120, //
});

const rateLimiterMiddleware = (req, res, next) => {
  const key = req.userId ? req.userId : req.ip;
  const pointsToConsume = req.userId ? 1 : 30;
  rateLimiterRedis.consume(key, pointsToConsume)
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
};

module.exports = rateLimiterMiddleware;
