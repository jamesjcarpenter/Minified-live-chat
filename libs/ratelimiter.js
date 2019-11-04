const redis = require('redis');
const {RateLimiterRedis} = require('rate-limiter-flexible');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const redisClient = redis.createClient({
  enable_offline_queue: false,
});

const rateLimiter = new RateLimiterRedis({
  redis: redisClient,
  points: 80, // 60 requests
  duration:1,
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests').end();
    });
};

module.exports = rateLimiterMiddleware;
