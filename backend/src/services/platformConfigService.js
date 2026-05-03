import platformConfigRepository from '../repositories/platformConfigRepository.js';

class PlatformConfigService {
  #cache = null;
  #cacheExpiresAt = 0;
  static #CACHE_TTL_MS = 60_000;

  async getConfig() {
    const now = Date.now();
    if (this.#cache && now < this.#cacheExpiresAt) return this.#cache;
    const config = await platformConfigRepository.get();
    this.#cache = config;
    this.#cacheExpiresAt = now + PlatformConfigService.#CACHE_TTL_MS;
    return config;
  }

  async updateConfig(data) {
    const config = await platformConfigRepository.update(data);
    this.#cache = null;
    this.#cacheExpiresAt = 0;
    return config;
  }

  async isContentFrozen() {
    const config = await this.getConfig();
    return config.contentFreeze === true;
  }
}

export const platformConfigService = new PlatformConfigService();
export default platformConfigService;
