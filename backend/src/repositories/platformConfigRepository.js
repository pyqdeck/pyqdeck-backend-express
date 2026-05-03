import {
  PlatformConfig,
  platformConfigZodSchema,
} from '../models/PlatformConfig.js';

class PlatformConfigRepository {
  async get() {
    let config = await PlatformConfig.findOne({ instanceId: 'main' });
    if (!config) {
      config = await PlatformConfig.create({ instanceId: 'main' });
    }
    return config;
  }

  async update(data) {
    const sanitized = platformConfigZodSchema.parse(data);

    // Flatten nested ai fields so $set patches individual keys, not the whole subdoc
    const setFields = {};
    for (const [key, value] of Object.entries(sanitized)) {
      if (key === 'ai' && value && typeof value === 'object') {
        for (const [aiKey, aiVal] of Object.entries(value)) {
          setFields[`ai.${aiKey}`] = aiVal;
        }
      } else {
        setFields[key] = value;
      }
    }

    return PlatformConfig.findOneAndUpdate(
      { instanceId: 'main' },
      { $set: setFields },
      { returnDocument: 'after', upsert: true, runValidators: true }
    );
  }
}

export const platformConfigRepository = new PlatformConfigRepository();
export default platformConfigRepository;
