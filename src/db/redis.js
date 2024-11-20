const redis = require("ioredis");

class Redis {
  constructor(config) {
    this.config = config;
    this.redis = null;
  }

  async connect() {
    this.redis = new redis(this.config);
  }

  async get(key) {
    return await this.redis.get(key);
  }

  async set(key, value) {
    return await this.redis.set(key, value);
  }

  async close() {
    await this.redis.quit();
  }
}

module.exports = Redis;
