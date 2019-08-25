const redis = require('redis');
const {RateLimiterRedis} = require('rate-limiter-flexible');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const redisClient = redis.createClient({
  enable_offline_queue: false,
});

const rateLimiter = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: 'middleware',
  points: 15, // 60 requests
  duration:1,
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      res.status(200).send({ error: "boo" });
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests').end();
    });
};

module.exports = rateLimiterMiddleware;
