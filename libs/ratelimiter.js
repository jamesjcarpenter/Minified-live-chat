const redis = require('redis');
const {RateLimiterRedis} = require('rate-limiter-flexible');

const redisClient = redis.createClient({
  enable_offline_queue: false,
});

const rateLimiter = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: 'middleware',
  points: 15, // 10 requests
  duration: 1, // per 1 second by IP
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
};

io.on('connection', (socket) => {
  socket.on('bcast', async (data) => {
    try {
      await rateLimiter.consume(socket.handshake.address); // consume 1 point per event from IP
      socket.emit('news', { 'data': data });
      socket.broadcast.emit('news', { 'data': data });
    } catch(rejRes) {
      res.status(429).send('Too Many Requests');
      socket.emit('blocked', { 'retry-ms': rejRes.msBeforeNext });
    }
  });
});

module.exports = rateLimiterMiddleware;
